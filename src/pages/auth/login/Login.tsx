import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Alert
} from 'react-native';

import styles from './LoginStyle';
import Loader from '../../../components/loader/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { useNetInfo } from "@react-native-community/netinfo";

type UserProps = {
  email: string,
  name: string,
  uid: string
};

var backHandler: any;

const Login = (props: any) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordType, setPasswordType] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);

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


  const form_validation = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == '') {
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
    else {
      if (netInfo.isConnected) {
        setEmailError(false);
        setPasswordError(false);
        setEmailErrorText('');

        setLoading(true);
        login();
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Please check your internet connection and try again',
        });
      }
    }
  }

  const login = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        fetch_userData_by_Uid(res?.user?.uid);

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        Toast.show({
          type: 'error',
          text1: 'Please check your credentials and try again',
        });
        setLoading(false);
      });
  }

  const fetch_userData_by_Uid = async (uid: string) => {
    const user = await firestore().collection('Users').where('uid', '==', uid).get();
    user.forEach(snapshot => {
      let data = snapshot.data();
      storeData({ email: data?.email, name: data?.name, uid: data?.uid });
    })
  }

  const storeData = async (obj: UserProps) => {
    try {
      let object = {
        email: obj?.email,
        name: obj?.name,
        uid: obj?.uid
      };

      await AsyncStorage.setItem('user_credentials', JSON.stringify(object));
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Login successfull',
      });
      setEmail('');
      setPassword('');
      props.navigation.navigate("NonAuthStack");

    } catch (e) {
      // saving error
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <ScrollView>
        <View style={styles.mian_view}>
          <View style={styles.title_view}>
            <Text style={styles._txt}>Login</Text>
          </View>

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

          <View style={styles._signup_btn_section}>
            <Text style={styles._signup_left_text}>Don't Have An Account? </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                props.navigation.navigate('Registration');
              }}>
              <Text style={styles._signup_clickable_text}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#77A1D3', '#79CBCA', '#77A1D3']} style={styles._button}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                form_validation();
              }}
              style={styles._touchableOpacity}>
              <Text style={styles._button_txt}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ScrollView>
      {loading ? <Loader></Loader> : null}
    </ImageBackground>
  );
};

export default Login;
