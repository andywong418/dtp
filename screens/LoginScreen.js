import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { callLogin } from '../actions/index';
import { Constants, Facebook } from 'expo';

class LoginScreen extends React.Component {
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
        await this.props.fetchUser(profile.name, profile.id, token);
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
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = (state) => ({
  login: state.login
});

const mapDispatchToProps = (dispatch) => ({
  callLogin: (user, id) => dispatch(callLogin(user, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
