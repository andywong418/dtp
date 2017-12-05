import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

//Screens
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';

//Navigator
export default StackNavigator(
  {
    Splash: {screen: SplashScreen},
    Login: {screen: LoginScreen},
  },
  {initialRouteName: 'Splash'}
);
