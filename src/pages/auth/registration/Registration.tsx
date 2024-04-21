import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import styles from './RegistrationStyle';
import Loader from '../../../components/loader/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

import LinearGradient from 'react-native-linear-gradient';
import { useNetInfo } from "@react-native-community/netinfo";

const Registration = (props: any) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<boolean>(true);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordType, setConfirmPasswordType] = useState<boolean>(true);

    const [loading, setLoading] = useState<boolean>(false);

    const [nameError, setNameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState<string>('');

    const netInfo = useNetInfo();

    const form_validation = () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (name == '') {
            setNameError(true);
        }
        else if (email == '') {
            setEmailError(true);
            setEmailErrorText('Enter email address');
        }
        else if (reg.test(email) === false) {
            setEmailError(true);
            setEmailErrorText('Invalid email address');
        }
        else if (password == '') {
            setPasswordError(true);

            setEmailError(false);
            setEmailErrorText('');
        }
        else if (confirmPassword == '') {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText('Please enter confirm password')

            setEmailError(false);
            setEmailErrorText('');
        }
        else if (password != confirmPassword) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText('Password and confirm password does not match');

            setEmailError(false);
            setEmailErrorText('');
        }
        else if (password.length! < 6 || confirmPassword.length! < 6) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorText('Password should be at least 6 characters')

            setEmailError(false);
            setEmailErrorText('');
        }
        else {
            if (netInfo.isConnected) {
                setNameError(false);
                setEmailError(false);
                setPasswordError(false);
                setConfirmPasswordError(false);
                setEmailErrorText('');
                setConfirmPasswordErrorText('');

                setLoading(true);
                register();
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Please check your internet connection and try again',
                });
            }

        }
    }

    const register = async () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log('User account created & signed in!');
                user_data_store_on_firebase_firestore(res?.user?.uid);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    const user_data_store_on_firebase_firestore = async (uid: string) => {

        firestore()
            .collection('Users')
            .add({
                name: name,
                email: email,
                uid: uid
            })
            .then(() => {
                console.log('User added!');
                setLoading(false);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                Toast.show({
                    type: 'success',
                    text1: 'Registration successfull',
                });

                props.navigation.goBack();
            });
    }

    return (
        <ImageBackground
            source={require('../../../assets/background.jpg')}
            resizeMode="cover"
            style={styles.container}>
            <ScrollView>
                <View style={styles.mian_view}>
                    <View style={styles.title_view}>
                        <Text style={styles._txt}>Register</Text>
                    </View>

                    <View style={styles._input_view}>
                        <Image style={styles._input_view_img} source={require('../../../assets/_avatar.png')} />
                        <TextInput
                            style={styles._input_view_text_input}
                            placeholderTextColor={'#000'}
                            onChangeText={text => {
                                setName(text);
                            }}
                            value={name}
                            placeholder="Enter name"
                            onBlur={() => {
                                setNameError(false);
                            }}
                        />
                    </View>
                    {nameError ? <View style={styles._error_view}>
                        <Text style={styles._error_text}>{'Enter your name'}</Text>
                    </View> : ''}

                    <View style={styles._input_view}>
                        <Image style={styles._input_view_img} source={require('../../../assets/_email.png')} />
                        <TextInput
                            style={styles._input_view_text_input}
                            placeholderTextColor={'#000'}
                            onChangeText={text => {
                                setEmail(text);
                            }}
                            value={email}
                            placeholder="Enter email"
                            onBlur={() => {
                                setEmailError(false);
                                setEmailErrorText('');
                            }}
                        />
                    </View>
                    {emailError ? <View style={styles._error_view}>
                        <Text style={styles._error_text}>{emailErrorText}</Text>
                    </View> : ''}

                    <View style={styles._input_view}>
                        <Image style={styles._input_view_img} source={require('../../../assets/password.png')} />
                        <TextInput
                            style={styles._input_view_text_input}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholderTextColor={'#000'}
                            placeholder="Enter password"
                            secureTextEntry={passwordType ? true : false}
                            maxLength={20}
                            onBlur={() => { setPasswordError(false) }}
                        />

                        <TouchableOpacity style={styles._input_view_hide_show_icon}
                            activeOpacity={0.8}
                            onPress={() => {
                                setPasswordType(!passwordType);
                            }}

                        >
                            <Image style={styles._input_view_hide_show_icon_img} source={passwordType ? require('../../../assets/_show_eye.png') : require('../../../assets/_hide_eye.png')} />
                        </TouchableOpacity>
                    </View>

                    {passwordError ? <View style={styles._error_view}>
                        <Text style={styles._error_text}>{'Enter your password'}</Text>
                    </View> : ''}

                    <View style={styles._input_view}>
                        <Image style={styles._input_view_img} source={require('../../../assets/password.png')} />
                        <TextInput
                            style={styles._input_view_text_input}
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                            placeholderTextColor={'#000'}
                            placeholder="Enter confirm password"
                            secureTextEntry={confirmPasswordType ? true : false}
                            maxLength={20}
                            onBlur={() => {
                                setConfirmPasswordError(false)
                                setConfirmPasswordErrorText('');
                            }}
                        />

                        <TouchableOpacity style={styles._input_view_hide_show_icon}
                            activeOpacity={0.8}
                            onPress={() => {
                                setConfirmPasswordType(!confirmPasswordType);
                            }}

                        >
                            <Image style={styles._input_view_hide_show_icon_img} source={confirmPasswordType ? require('../../../assets/_show_eye.png') : require('../../../assets/_hide_eye.png')} />
                        </TouchableOpacity>
                    </View>

                    {confirmPasswordError ? <View style={styles._error_view}>
                        <Text style={styles._error_text}>{confirmPasswordErrorText}</Text>
                    </View> : ''}

                    <View style={styles._signup_btn_section}>
                        <Text style={styles._signup_left_text}>Already have an account? click on the </Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                            style={{}}>
                            <Text style={styles._signup_clickable_text}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#77A1D3', '#79CBCA', '#77A1D3']} style={styles._button}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                form_validation();
                            }}
                            style={styles._touchableOpacity}>
                            <Text style={styles._button_txt}>Register</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            </ScrollView>
            {loading ? <Loader></Loader> : null}
        </ImageBackground>
    );
};

export default Registration;