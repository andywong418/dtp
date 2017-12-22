import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  TabNavigator,
  TabBarBottom,
  TabBarTop,
} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import ConversationScreen from '../screens/ConversationScreen';
import ChatroomListScreen from '../screens/ChatroomListScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Conversation: {
      screen: ConversationScreen
    },
    Chatrooms: {
      screen: ChatroomListScreen
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#B400FF',
      },
      headerTintColor: 'white',
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Links':
            iconName =
              Platform.OS === 'ios'
                ? `ios-link${focused ? '' : '-outline'}`
                : 'md-link';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios'
                ? `ios-options${focused ? '' : '-outline'}`
                : 'md-options';
            break;
          case 'Conversation':
            iconName =
              Platform.OS === 'ios'
                ? `ios-chatboxes${focused ? '' : '-outline'}`
                : 'md-chatboxes';
            break;
          case 'Chatrooms':
            iconName =
              Platform.OS === 'ios'
                ? `ios-list${focused ? '' : '-outline'}`
                : 'md-list';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
