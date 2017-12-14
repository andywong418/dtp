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

import LinksScreen from './LinksScreen';
import SettingsScreen from './SettingsScreen';
import SwipableList from '../components/SwipableList';
const cards = [
  {
    text: 'Card 1',
    name: 'One',
    image: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/18193988_10212890054110652_6684327312202603844_n.jpg?oh=3edb4dc74f50aef189092d237556886d&oe=5ACEEBFE',
  },
  {
    text: 'Card 2',
    name: 'Two',
    image: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13001076_10209237661643123_8464693319251522402_n.jpg?oh=e6473082226187179c5860f7c42b0010&oe=5AC8C9A6',
  },
  {
    text: 'Card 3',
    name: 'Three',
    image: 'https://scontent.xx.fbcdn.net/v/t1.0-9/22814524_10212833454884011_1009317153681447778_n.jpg?oh=6a1b5b73bbe146361c4c991218eeb99f&oe=5AC442F6',
  },
]

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

  render() {
    if (this.props.user.user  ) {
      console.log("home user check",this.props.user.user.data);
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
                    reject={(user) => this.rejectUser(user)}
                    meet={(user) => this.meetUser(user)} />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
