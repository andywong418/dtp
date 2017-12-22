import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
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
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base'
import { callLogout } from '../actions/index';
import {
  WebBrowser,
  ImagePicker
} from 'expo';

import SettingsScreen from './SettingsScreen';
import SwipableList from '../components/SwipableList';
import {
  avoidTopUser,
  meetTopUser
} from '../actions/index';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      viewMoreInfo: false,

    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  navigateToConvo(user) {
    this.props.navigation.navigate('Conversation', {user});
  }

  render() {
    if (this.props.user.user && !this.props.user.user.data.profileComplete) {
      return (
        <View>
          <Text>Unfinished setup -> direct to settings and cloud screen</Text>
          <Button
            title="nav to Settings"
            onPress={() => this._navToSettings()}
          />
        </View>
      )
    }
    else if (this.props.user.user && this.props.user.matchedUsers && !this.state.viewMoreInfo) {
      return (
        <SwipableList
          users={this.props.user.matchedUsers}
          user={this.props.user.user.data}
          reject={this.props.avoidTopUser}
          meet={this.props.meetTopUser}
          sendMessage={this.navigateToConvo}
        />
      )
    }
    else {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#B400FF"/>
        </View>
      );
    }
  }

  _navToLinks = () => {
    this.props.navigation.navigate('Links');
  }

  _navToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  _pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
    });
    if (!image.cancelled) {
      this.setState({ image: image.uri });
    }
  };

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
  meetTopUser: (user) => dispatch(meetTopUser(user)),
  avoidTopUser: (user) => dispatch(avoidTopUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
