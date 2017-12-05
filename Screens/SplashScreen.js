import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import styles from './styles';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    try {
      let userJson = await AsyncStorage.getItem('user')
      let user = JSON.parse(userJson);
      console.log(user);
      if (user && user.password && user.name) {
        // TODO: Facebook Oath
      }
      else this.props.navigation.navigate('Login');
    }
    catch (e) {
      console.log('Error generated: \n', e);
      this.props.navigation.navigate('Login');
    }
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to DTP!</Text>
      </View>
    )
  }
}

export default SplashScreen;
