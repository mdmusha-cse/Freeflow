import React from 'react';

import {
  LogBox
} from 'react-native';
LogBox.ignoreAllLogs();

import Toast from 'react-native-toast-message';

//Splash screen
import Splash from './src/pages/splash/Splash';

//Auth pages
import Login from './src/pages/auth/login/Login';
import Registration from './src/pages/auth/registration/Registration';

//Non-auth pages
import Home from './src/pages/nonAuth/home/Home';
import Chat from './src/pages/nonAuth/chat/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);


const NonAuthStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

function App() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
          />
          <Stack.Screen
            name="NonAuthStack"
            component={NonAuthStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;