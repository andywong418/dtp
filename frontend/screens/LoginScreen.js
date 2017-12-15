import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import LoginButton from '../components/LoginButton';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Login'
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/Seren_Logo.png')}
          style={{ width: 200, height: 200, marginTop: -80 }}
        />
        <Text style={styles.headlineText}>
          Seren - the new way to social
        </Text>
        <LoginButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#B400FF',
    flex: 1,
    justifyContent: 'center',
  },
  headlineText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 100,
  },
  logo: {
    height: 200,
    marginTop: -80,
    width: 200,
  },
});
