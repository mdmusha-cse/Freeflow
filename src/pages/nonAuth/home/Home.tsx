import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    BackHandler,
    Alert
} from 'react-native';

import { Svg, Path } from 'react-native-svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import { fetch, useNetInfo } from "@react-native-community/netinfo";
import Toolbar from '../../../components/toolbar/Toolbar';
import styles from './HomeStyle';

const { height, width } = Dimensions.get('window');
var backHandler: any;

const Home = (props: any) => {

    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isClearButtonClicked, setClearButtonClicked] = useState(false);

    const netInfo = useNetInfo();

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Exit App", "Do you want to exit this application?", [
                {
                    text: "Cancel",
                    onPress: () => { null },
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        props.navigation.addListener('focus', () => {
            backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
        });

        props.navigation.addListener('blur', () => {
            backHandler.remove();
        });

        // return focusListener;
        return () => backHandler.remove();
    }, []);

    const onTouchEnd = () => {
        paths.push(currentPath);
        setCurrentPath([]);
        setClearButtonClicked(false);

        storeData(paths);
    };

    const onTouchMove = (event: any) => {
        const newPath = [...currentPath];
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;
        const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
        newPath.push(newPoint);
        setCurrentPath(newPath);
    };

    const handleClearButtonClick = async () => {
        setPaths([]);
        setCurrentPath([]);
        setClearButtonClicked(true);

        if (netInfo.isConnected) {
            firestore()
                .collection('DrawData')
                .doc('paths')
                .set({
                    paths: []
                })
                .then(() => {
                    console.log('User added!');
                });
        }
        else {
            try {
                await AsyncStorage.setItem('draw_data', '[]');
            } catch (e) {
                // saving error
            }
        }
    };

    const storeData = async (value: any) => {
        const jsonValue = JSON.stringify(value);

        if (netInfo.isConnected) {
            firestore()
                .collection('DrawData')
                .doc('paths')
                .set({
                    paths: jsonValue
                })
                .then(() => {
                    console.log('User added!');
                });
        }
        else {
            try {
                await AsyncStorage.setItem('draw_data', jsonValue);
            } catch (e) {
                // saving error

            }
        }
    };

    useEffect(() => {
        get_draw_data();


        if (netInfo.isConnected) {
            get_draw_data();
        }

    }, [netInfo]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('DrawData')
            .doc('paths')
            .onSnapshot(documentSnapshot => {
                // console.log('User data: ', documentSnapshot.data());

                if (netInfo.isConnected) {

                    if (documentSnapshot.data()?.paths == '') {
                        setPaths([]);
                    }
                    else {
                        let jsonData = JSON.parse(documentSnapshot?.data()?.paths);
                        setPaths(jsonData);
                    }
                }
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [netInfo]);

    const get_draw_data = async () => {

        try {
            const value = await AsyncStorage.getItem('draw_data');
            if (value !== null) {

                let data = JSON.parse(value);

                setPaths(data);
                if (netInfo.isConnected) {
                    await AsyncStorage.removeItem('draw_data');
                    storeData(data);
                }
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
            <Toolbar title='Home' logout={true} />

            <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Svg height={height * 0.7} width={width}>
                    <Path
                        d={paths.join('')}
                        stroke={isClearButtonClicked ? 'transparent' : 'blue'}
                        fill={'transparent'}
                        strokeWidth={4}
                        strokeLinejoin={'round'}
                        strokeLinecap={'round'}
                    />
                    {paths.length > 0 &&
                        paths.map((item, index) => (
                            <Path
                                key={`path-${index}`}
                                d={currentPath.join('')}
                                stroke={isClearButtonClicked ? 'transparent' : 'blue'}
                                fill={'transparent'}
                                strokeWidth={4}
                                strokeLinejoin={'round'}
                                strokeLinecap={'round'}
                            />
                        ))}
                </Svg>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 5, width: '90%', justifyContent: 'space-around', backgroundColor: 'green' }}>
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles._chat_view} onPress={() => {
                        props.navigation.navigate('Chat');
                    }}>
                        <Image style={styles._chat_icon} resizeMode='center' source={require('../../../assets/chat_icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Home;