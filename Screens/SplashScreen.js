import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
