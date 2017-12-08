import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  callLogin,
  populateUser,
} from '../actions/index';
import { Constants, Facebook } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Login'
  };

  // async _retrieveUserInfo(name, id, token) {
  //   try {
  //     let user = await axios.post('http://10.2.106.85:3000/api/facebook/retrieveInfo', {name, id, token})
  //     this.props.populateUser(user);
  //   }
  //   catch (e) {
  //     console.log("Error in App retrieveUserInfo: \n", e)
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
      <Image
          source={require('../assets/images/Seren_Logo.png')}
          style={{width: 200, height: 200, marginTop: -80}}
        />
        <Text style={styles.headlineText}>
          Seren - the new way to social
        </Text>
        <TouchableOpacity style={styles.logInButton}>

        <Icon.Button onPress= {() => this._handleFacebookLogin()} name="facebook" backgroundColor="#3b5998" style={{padding: 16, paddingLeft: 50, paddingRight: 50}}>
          <Text style={styles.button}>Log in with Facebook</Text>
        </Icon.Button>
        </TouchableOpacity>
      </View>
    )
  }

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        // <app id>, permissions: []
        '323730871442301',
        {
          permissions: [
            'email',
            'public_profile',
            'user_about_me',
            'user_birthday',
            'user_education_history',
            'user_friends',
            'user_hometown',
            'user_religion_politics',
            'user_work_history',
            'user_likes',
            'user_photos',
            'user_actions.books',
            'user_actions.music'
          ]
        }
      );
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const profile = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify({
          name: profile.name,
          id: profile.id,
        }))
        this.props.callLogin(profile.name, profile.id)
        let user = await axios.post(
          'http://10.2.106.85:3000/api/facebook/retrieveInfo',
          {
            name: profile.name,
            profile: profile.id,
            token,
          }
        )
        this.props.populateUser(user);
      }
    }
    catch (e) {
      console.log("error in login: ", e);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B400FF',
  },
  headlineText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 100
  },
  logInButton: {
    borderRadius: 10,

  },
  button: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Arial'
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  populateUser: (user) => dispatch(populateUser(user)),
  callLogin: (user, id) => dispatch(callLogin(user, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
