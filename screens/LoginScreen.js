import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, Facebook } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      id: undefined,
    }
  }

  static navigationOptions = {
    title: 'Login'
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        // <app id>, permissions: []
        '323730871442301',
        {
          permissions: [
            'email',
            'public_profile',
            'read_custom_friendlists',
            'user_about_me',
            'user_birthday',
            'user_education_history',
            'user_friends',
            'user_hometown',
            'user_location',
            'user_relationship_details',
            'user_relationships',
            'user_religion_politics',
            'user_work_history',
          ]
        }
      );
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const profile = await response.json();
        this.setState({
          name: profile.name,
          id: profile.id,
        })
        await AsyncStorage.setItem('user', JSON.stringify({
          name: this.state.name,
          id: this.state.id,
        }))
        console.log(this.state.name, this.state.id);
        this.props.callLogin();
        this.props.fetchUser(profile.name, profile.id, token);

      }
    }
    catch (e) {
      console.log("error in login: ", e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login with Facebook"
          onPress={() => this._handleFacebookLogin()}
          />
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
