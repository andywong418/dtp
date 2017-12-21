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
  meetTopUser,
  navigateToConvo,
} from '../actions/index';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      viewMoreInfo: false,

    }
    this.sendMessage= this.sendMessage.bind(this);
  }

  static navigationOptions = {
    title: 'Home',

  };

  sendMessage(user) {

    this.props.navigateToConvo(user);
  }

  render() {
    if (this.props.user.user  ) {
      if (!this.props.user.user.data.profileComplete) {
        // this.props.navigation.navigate('Settings');
        return (
          <View>
            <Text>Unfinished setup -> direct to settings and cloud screen</Text>
            <Button
              title="nav to Settings"
              onPress={() => this._navToSettings()}
            />
          </View>
        )
      } else{
        return (
          <View>
          {this.props.user.matchedUsers ?
              <View>
                { this.state.viewMoreInfo ?
                    null
                  :

                    <SwipableList
                    users={this.props.user.matchedUsers}
                    user={this.props.user.user.data}
                    reject={this.props.avoidTopUser}
                    meet={this.props.meetTopUser}
                    sendMessage={this.sendMessage}
                    navigateToConvo={this.props.navigateToConvo}
                    navigateBackToMessages={this._navtoMessages}
                    />

                }
              </View>
            :
              null
          }
          </View>
        )
      }
    } else{
      return null;
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
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
  meetTopUser: (user) => dispatch(meetTopUser(user)),
  avoidTopUser: (user) => dispatch(avoidTopUser(user)),
  navigateToConvo: (user) => dispatch(navigateToConvo(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
