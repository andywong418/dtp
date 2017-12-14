import React from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
  Location,
  Permissions
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  callLogin,
  callLogout,
  populateUser,
  fetchUserFromDB,
  updateLocation,
  getNearbyUsers
} from '../actions/index';

import RootNavigation from '../navigation/RootNavigation';
import LoginScreen from './LoginScreen.js';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let user, coords = null;
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted' && !await Permissions.askAsync(Permissions.LOCATION)) {   //Permission Denied
        throw 'Location services permissions denied!';
      } else {  //Permission Granted
        let isEnabled = await Location.getProviderStatusAsync();
        if (!isEnabled.locationServicesEnabled) {
          this.locationPrompt();
        } else {
          coords = await this.getLocation();
        }
      }
      let userJson = await AsyncStorage.getItem('user');
      user = JSON.parse(userJson);
      console.log(user ? 'AsyncStorage user exists' : 'AsyncStorage user does not exist')
      if (user && user.name && user.id) {
        this.props.callLogin(user.name, user.id);
        let fetchedUser = await axios.post(
          'http://10.2.106.91:3000/api/users/fetchUser',
          { facebookId: user.id }
        );
        let location = await this.updateLocationDB(coords, fetchedUser.data.facebookId);
        let matchUsers = await this.getNearbyUsersDB(location);
        this.props.updateLocation(location)
        this.props.fetchUserFromDB(fetchedUser);
        this.props.getNearbyUsers(matchUsers);
      } else {
        this.props.callLogout()
      }
    }
    catch (e) {
      console.log("Error in App componentDidMount: \n", e)
    }
  }

  updateLocationDB = async (location, id) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    let response = await axios.post(
      'http://10.2.106.91:3000/api/users/updateLocation',
      {
        facebookId: id,
        lat,
        lng
      }
    )
    let city = response.data;
    return {
      lat,
      lng,
      city
    };
  };

  getNearbyUsersDB = async(location, facebookId) => {
    let response = await axios.post(
      'http://10.2.106.91:3000/api/users/getNearbyUsers',
      {
        facebookId,
        location
      }
    );

    let users = response.data;
    return users;
  }
  getLocation = async () => {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  };

  locationPrompt = async () => {
    Alert.alert(
      'Location Services disabled',
      'Please turn on GPS then press OK to continue.',
      [
        {
          text: 'OK', onPress: async () => {
            let status = await Location.getProviderStatusAsync();
            if (!status.locationServicesEnabled) {
              Alert.alert(
                'Location Services disabled',
                'GPS has not been turned on; you won\'t be able to use the full features of the app.',
                [{ text: 'OK' }],
                { cancelable: false }
              );
            } else {
              let location = await this.getLocation();
            }
          }
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    else {
      return (
        <View style={styles.container}>
          {
            this.props.login.isLoggedIn
              ?
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                <RootNavigation />
              </View>
              :
              <LoginScreen />
          }
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
  location: state.location
});

const mapDispatchToProps = (dispatch) => ({
  populateUser: (user) => dispatch(populateUser(user)),
  callLogin: (name, id) => dispatch(callLogin(name, id)),
  callLogout: () => dispatch(callLogout()),
  fetchUserFromDB: (user) => dispatch(fetchUserFromDB(user)),
  updateLocation: (location) => dispatch(updateLocation(location)),
  getNearbyUsers: (users) => dispatch(getNearbyUsers(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
