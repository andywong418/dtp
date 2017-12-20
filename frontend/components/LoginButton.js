import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  callLogin,
  populateUser,
} from '../actions/index';
import {
  Facebook,
} from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

class LoginButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.logInButton}>
        <Icon.Button
          onPress={() => this._handleFacebookLogin()}
          name="facebook"
          backgroundColor="#3b5998"
          style={styles.icon}
        >
          <Text style={styles.button}>Log in with Facebook</Text>
        </Icon.Button>
      </TouchableOpacity>
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
          'http://10.2.106.91:3000/api/facebook/retrieveInfo',
          {
            facebookId: profile.id,
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
  button: {
    color: 'white',
    fontSize: 20,
  },
  icon: {
    padding: 16,
    paddingLeft: 50,
    paddingRight: 50
  },
});

const mapDispatchToProps = (dispatch) => ({
  callLogin: (user, id) => dispatch(callLogin(user, id)),
  populateUser: (user) => dispatch(populateUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginButton);
