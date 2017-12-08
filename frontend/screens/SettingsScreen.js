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

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
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
  login: state.login
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
