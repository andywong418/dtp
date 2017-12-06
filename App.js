import React from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
// import { StackNavigator } from 'react-navigation';
import {
  AppLoading,
  Asset,
  Font
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isLoggedIn: false,
    }
  }

  async componentDidMount() {
    try {
      let userJson;
      try {
        userJson = await AsyncStorage.getItem('user')
      }
      catch (e) {
        console.log("Error in App componentDidMount: \n", e);
        this.setState({
          isLoggedIn: false,
        })
      }
      console.log(userJson);
      let user = JSON.parse(userJson);
      console.log(user);
      if (user && user.name) {
        this.setState({
          isLoggedIn: true,
        })
      }
      else {
        this.setState({
          isLoggedIn: false,
        })
      }
    }
    catch (e) {
      console.log('pls no: ', e);
    }
  }

  login() {
    this.setState({
      isLoggedIn: true,
    })
  }

  logout() {
    this.setState({
      isLoggedIn: false,
    })
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
            this.state.isLoggedIn
            ?
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
              <RootNavigation />
            </View>
            :
            <LoginScreen
              callLogin={() => this.login()}
            />
          }
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
