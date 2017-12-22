import { Notifications } from 'expo';
import React from 'react';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  TabBarTop,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import DirectMessageScreen from '../screens/DirectMessageScreen';
import ChatroomScreen from '../screens/ChatroomScreen';
import UsernameGeneratorScreen from '../screens/UsernameGeneratorScreen';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    DirectMessage: {
      screen: DirectMessageScreen
    },
    Chatroom: {
      screen: ChatroomScreen,
    },
    UsernameGenerator: {
      screen: UsernameGeneratorScreen,
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

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    //console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
