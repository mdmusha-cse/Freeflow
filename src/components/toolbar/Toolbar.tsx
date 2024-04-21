import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ToolbarStyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNetInfo } from "@react-native-community/netinfo";

type ItemProps = { title: string, logout: boolean };

export default function Toolbar(props: ItemProps) {

    const navigation = useNavigation();
    const netInfo = useNetInfo();

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            if (netInfo.isConnected) {
                auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
            }

            navigation.navigate('AuthStack');
        } catch (e) {
            // remove error
        }
    }

    return (
        <View style={styles.toolbar}>
            <Text style={styles._toolbar_name}>{props.title}</Text>
            {props.logout ? <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    logout();
                }}
                style={{ width: 40, height: 40, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 25, height: 25, tintColor: '#fff' }} source={require('../../assets/logout_icon.png')} />
            </TouchableOpacity> : null}

        </View>
    );
}