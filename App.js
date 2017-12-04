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

//Navigator
export default StackNavigator(
  {
    Splash: {screen: SplashScreen},
  },
  {initialRouteName: 'Splash'}
);
