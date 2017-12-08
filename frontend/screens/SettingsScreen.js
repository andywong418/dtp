import React from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Spinner,
} from 'native-base'
import { callLogout } from '../actions/index';
import {
  WebBrowser,
  ImagePicker,
} from 'expo';
import Picture from '../components/Picture'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const {user} = this.props.user;
    console.log("USER settings", user);
    return (
      // TODO: pictures
      // TODO: 3 main interests
      // TODO: friend or d8? -- radio button native base
      // TODO: one line bio
      <ScrollView>
        <View>
          <Picture />
          <Picture />
          <Picture />
        </View>
        <List>
          <ListItem style={{marginLeft: 0}}>
            <Body>
              <Button
                title="Logout"
                onPress={() => this._handleLogout()}
              />
            </Body>
          </ListItem>
        </List>
      </ScrollView>
    )
  }

  _handleLogout = async () => {
    try {
      console.log('heading into logout');
      await AsyncStorage.removeItem('user')
      this.props.callLogout();
    }
    catch (e) {
      console.log('logoutError: ', e);
    }
  };
}

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
