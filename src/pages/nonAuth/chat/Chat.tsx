
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Touchable, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import styles from './ChatStyle';

import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import Toolbar from '../../../components/toolbar/Toolbar';
import ChatStyle from './ChatStyle';
import Toast from 'react-native-toast-message';
import moment from "moment";
import { useNetInfo } from "@react-native-community/netinfo";

export default function Chat() {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ msg: string, uid: string, time: string }[]>([]);
    const [userCreds, setUserCreds] = useState<{ name: string, email: string, uid: string }>();

    const netInfo = useNetInfo();

    useEffect(() => {

        database()
            .ref('/chats')
            .on('value', snapshot => {

                let chats = Object.values(snapshot.val());

                let sortedChatByDate = chats.sort(function (a, b) {
                    return new Date(b.timeStamp) - new Date(a.timeStamp);
                });

                setMessages(sortedChatByDate);

                // setMessages(Object.values(snapshot.val()));


            });
    }, []);

    const handleSend = () => {

        if (message) {
            if (netInfo.isConnected) {
                const newReference = database().ref('/chats').push();

                console.log('Auto generated key: ', newReference.key);

                newReference
                    .set({
                        name: userCreds?.name,
                        timeStamp: new Date().toISOString(),
                        uid: userCreds?.uid,
                        msg: message
                    })
                    .then(() => {
                        console.log('Data updated.');
                        setMessage('');
                    });
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Please check your internet connection and try again',
                });
            }
        }
    }

    const renderMessage = (item: any) => {
        
        return (
            <View style={styles._mail_chat_area}>
                {item.item.uid == userCreds?.uid ?
                    <View style={styles._sender_chat_box}>
                        <Text style={styles._chat_box_name}>{item?.item?.name}</Text>
                        <Text style={styles._chat_box_msg}>{item?.item?.msg}</Text>
                        <Text style={styles._dateTime}>{moment(item?.item?.timeStamp).format('lll')}</Text>
                    </View>
                    :
                    <View style={styles._receiver_chat_box}>
                        <Text style={styles._chat_box_name}>{item?.item?.name}</Text>
                        <Text style={styles._chat_box_msg}>{item?.item?.msg}</Text>
                        <Text style={styles._dateTime}>{moment(item?.item?.timeStamp).format('lll')}</Text>
                    </View>
                }
            </View>
        );
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user_credentials');
            if (value !== null) {
                // value previously stored
                let data = JSON.parse(value);
                setUserCreds(data);

            }
        } catch (e) {
            // error reading value
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/background.jpg')}
            resizeMode="cover"
            style={styles.container}
        >

            <Toolbar title='Chat' logout={false} />
            <FlatList
                data={messages}
                renderItem={renderMessage}
                inverted={true}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.text_input}
                    placeholder="Type a message"
                    placeholderTextColor={'#000'}
                    value={message}
                    multiline
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles._btn}
                    activeOpacity={0.8}
                    onPress={() => {
                        handleSend();
                    }}>
                    <Image style={styles._sender_icon} resizeMode='center' source={require('../../../assets/send_icon.png')} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
