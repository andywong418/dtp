import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
} from 'react-native';
import {
  Body,
  List,
  ListItem,
} from 'native-base';
import {
  callLogout,
} from '../actions/index';
import { connect } from 'react-redux';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem style={{marginLeft: 0,}}>
        <Body>
          <Button
            title="Logout"
            onPress={() => this._handleLogout()}
            color="#B400FF"
            style={styles.button}
          />
        </Body>
      </ListItem>
    )
  }

  _handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      this.props.callLogout();
    }
    catch (e) {
      console.log('logoutError: ', e);
    }
  };
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-end',
    marginTop: 5,
    paddingTop: 5,
  },
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
