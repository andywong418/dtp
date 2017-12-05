import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    }
  }

  static navigationOptions = {
    title: 'Login'
  };

  login(username, password) {
    return fetch('https://hohoho-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then( response => response.json() )
  }

  callLogin(username, password) {
    this.login(username, password)
    .then( responseJson => {
      responseJson.success ?
        AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          id: responseJson.user._id,
        }))
        .then( () => {
          this.props.navigation.navigate('Users')
        })
      :
        this.setState({
          message: responseJson.error,
        });
    })
    .catch( error => {console.log('error in login: ', error)})
  }

  navToRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => {this.callLogin()} }
          style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Connect to FB</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  textError: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#FF585B',
  },
  textUsername: {
    fontSize: 15,
    textAlign: 'center',
  },
  textMessageRight: {
    fontSize: 15,
    textAlign: 'right',
  },
  textMessageLeft: {
    fontSize: 15,
    textAlign: 'left',
  },
  textUsernameContainer: {
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  textMessageContainer: {
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  mapViewContainer: {
    padding: 10,
    height: 100,
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  inputText: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: 16,
  }
});
