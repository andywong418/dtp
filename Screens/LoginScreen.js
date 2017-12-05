import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
import styles from './styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = {
    title: 'Login'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login Page</Text>
      </View>
    )
  }
}

export default LoginScreen;
