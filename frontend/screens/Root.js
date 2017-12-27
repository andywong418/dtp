import React from 'react';
import {
  AsyncStorage,
  KeyboardAvoidingView,
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
  getNearbyUsers,
  updateUserInfo,
} from '../actions/index';

import RootNavigation from '../navigation/RootNavigation';
import LoginScreen from './LoginScreen.js';
import DirectMessageScreen from './DirectMessageScreen.js';

// console.disableYellowBox = true;

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    this.setState({ isLoadingComplete: false })
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
      if (user && user.name && user.id) {
        this.props.callLogin(user.name, user.id);
        let fetchedUser = await axios.post(
          'http://10.2.106.85:3000/api/users/fetchUser',
          { facebookId: user.id }
        );
        let location = await this.updateLocationDB(coords, fetchedUser.data.facebookId);
        let matchUsers = await this.getNearbyUsersDB(location, fetchedUser.data.facebookId);
        this.props.updateLocation(location)
        this.props.fetchUserFromDB(fetchedUser);
        this.props.getNearbyUsers(matchUsers);
        this.props.updateUserInfo(fetchedUser.data.intention, this.parseInterestsFromDB(fetchedUser.data.mainInterests), fetchedUser.data.bio)
      } else {
        this.props.callLogout()
      }
    }
    catch (e) {
      console.log("Error in App componentDidMount: \n", e)
    }
    this.setState({ isLoadingComplete: true })
  }

  parseInterestsFromDB = (interestsArray) => {
    let res = {}
    res['interest1'] = interestsArray[0];
    res['interest1']['categorySelected'] = res['interest1']['category']
    res['interest1']['subCategorySelected'] = res['interest1']['subCategory']
    res['interest2'] = interestsArray[1];
    res['interest2']['categorySelected'] = res['interest2']['category']
    res['interest2']['subCategorySelected'] = res['interest2']['subCategory']
    res['interest3'] = interestsArray[2];
    res['interest3']['categorySelected'] = res['interest3']['category']
    res['interest3']['subCategorySelected'] = res['interest3']['subCategory']
    delete res['interest1']['category']
    delete res['interest1']['subCategory']
    delete res['interest2']['category']
    delete res['interest2']['subCategory']
    delete res['interest3']['category']
    delete res['interest3']['subCategory']
    return res
  }

  updateLocationDB = async (location, id) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    let response = await axios.post(
      'http://10.2.106.85:3000/api/users/updateLocation',
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

  getNearbyUsersDB = async (location, facebookId) => {
    let response = await axios.post(
      'http://10.2.106.85:3000/api/users/getNearbyUsers',
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
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
        </KeyboardAvoidingView>

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
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
  location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
  populateUser: (user) => dispatch(populateUser(user)),
  callLogin: (name, id) => dispatch(callLogin(name, id)),
  callLogout: () => dispatch(callLogout()),
  fetchUserFromDB: (user) => dispatch(fetchUserFromDB(user)),
  updateLocation: (location) => dispatch(updateLocation(location)),
  getNearbyUsers: (users) => dispatch(getNearbyUsers(users)),
  updateUserInfo: (intention, interests, bio) => dispatch(updateUserInfo(intention, interests, bio)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
