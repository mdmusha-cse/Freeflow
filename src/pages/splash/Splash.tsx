import React, { useEffect } from 'react';

import {
  SafeAreaView,
  Text,
  Image,
  ImageBackground
} from 'react-native';

import styles from './Splashstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash(props: any) {

  useEffect(() => {
    const focusListener = props.navigation.addListener('focus', () => {
      setTimeout(() => {
        userPreLoginChecking();
      }, 2500);
    });

    return focusListener;
  }, [props.navigation]);

  const userPreLoginChecking = async () => {
    try {
      const user_credentials = await AsyncStorage.getItem('user_credentials');

      if (user_credentials !== null) {
        props.navigation.navigate("NonAuthStack");
      }
      else {
        props.navigation.navigate("AuthStack");
      }
    } catch (e) {
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      resizeMode="cover"
      style={styles.container}>
      <Image style={styles._logo} source={require('../../assets/logo.png')} />
    </ImageBackground>
  );
}

export default Splash;