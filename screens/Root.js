import React from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  callLogin,
  callLogout,
 } from '../actions/index';

import RootNavigation from '../navigation/RootNavigation';
import LoginScreen from './LoginScreen.js';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    }
  }

  async componentDidMount() {
    let user;
    try {
      let userJson = await AsyncStorage.getItem('user')
      user = JSON.parse(userJson);
      if (user && user.name && user.id) this.props.callLogin(user.name, user.id)
      else this.props.callLogout()
    }
    catch (e) {
      console.log("Error in App componentDidMount: \n", e)
    }
  }

  async retrieveUserInfo(name, id, token) {
    try {
      let user = axios.post('http://10.2.106.85:3000/api/facebook/retrieveInfo', {name, id, token})
      this.setState({user});
    }
    catch (e) {
      console.log("Error in App retrieveUserInfo: \n", e)
    }
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
            <LoginScreen
              fetchUser={(name, id, token) => this.retrieveUserInfo(name, id, token)}
            />
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
  login: state.login
});

const mapDispatchToProps = (dispatch) => ({
  callLogin: (user, id) => dispatch(callLogin(user, id)),
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
