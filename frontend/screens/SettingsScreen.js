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
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Switch,
  Spinner,
} from 'native-base';
import Swiper from 'react-native-swiper';
import {
  callLogout,
  updateUserDetails,
} from '../actions/index';
import {
  WebBrowser,
  ImagePicker,
} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picture from '../components/Picture';
import PersonalPictureSwiper from '../components/PersonalPictureSwiper';
import IntentionButton from '../components/IntentionButton';
import Intentions from '../components/Intentions';
import InterestSelector from '../components/InterestSelector';
import PersonalBio from '../components/PersonalBio';
import LogoutButton from '../components/LogoutButton';
import { Dropdown } from 'react-native-material-dropdown';
import {
  categories,
  subCategories,
} from '../constants/Categories';
const { width } = Dimensions.get('window')


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intention: 'open_minded',
      showIntentionHelperText: false,
      intentions: [
        {
          name: 'Open Minded',
          isSelected: this.props.user.intention == 'Open Minded',
        },
        {
          name: 'Friendship',
          isSelected: this.props.user.intention == 'Friendship',
        },
        {
          name: 'Dating',
          isSelected: this.props.user.intention == 'Dating',
        },
      ],
      interests: {
        'interest1': {
          categorySelected: false,
          subCategorySelected: false,
          description: null
        },
        'interest2': {
          categorySelected: false,
          subCategorySelected: false,
          description: null
        },
        'interest3': {
          categorySelected: false,
          subCategorySelected: false,
          description: null
        }
      },
      intention: this.props.user.intention,
      bio: '',
    }
  }

  static navigationOptions = {
    title: 'Settings',
  }

  componentWillUmount = () => {
    this.props.updateUserDetails(this.state.intention)
    // TODO: server call
  }

  render() {
    //TODO pictures
    //TODO 3 main interests
    //TODO goals
    //TODO Quick oneliner

    const {user} = this.props.user;
    console.log(user ? 'user exists' : 'user does not exist')
    if(user){
      if(user.data) {
        return (
          <ScrollView>
            <PersonalPictureSwiper
              photos={user.data.photos}
            />
            <Intentions
              intentions={this.state.intentions}
              _handleIntentionChoice={(intention) => this._handleIntentionChoice(intention)}
            />
            <View style={styles.interestContainer}>
              <Text style={styles.textHeading}>Specify your 3 main interests</Text>
              {Object.keys(this.state.interests).map(interest => {
                return (
                  <InterestSelector
                    key={interest}
                    interestName={interest}
                    interest={this.state.interests[interest]}
                    changeInterestState={(interestKey, value) => this._changeInterestState(interest, interestKey, value)}
                  />
                )
              })}
            </View>
            <PersonalBio
              setBio={(value) => this._setBio(value)}
            />
            <LogoutButton />
          </ScrollView>
        )
      }

    }
    return (
      <ScrollView>
        <Text>Loading...</Text>
        <LogoutButton/>
      </ScrollView>
    )

  }

  _setBio = (value) => {
    this.setState({bio: value})
  }

  _handleIntentionChoice = (choice) => {
    this.setState({
      intention: choice,
      intentions: [
        {
          name: 'Open Minded',
          isSelected: choice == 'Open Minded',
        },
        {
          name: 'Friendship',
          isSelected: choice == 'Friendship',
        },
        {
          name: 'Dating',
          isSelected: choice == 'Dating',
        },
      ],
    })
  };

  _changeInterestState = (interest, interestKey, value) => {
    let newInterestState = Object.assign({}, this.state.interests);
    newInterestState[interest] = Object.assign({}, newInterestState[interest]);
    newInterestState[interest][interestKey] = value
    if (newInterestState[interest][interestKey] != this.state.interests[interest][interestKey]) {
      if (interestKey == 'categorySelected') {
        console.log('changing down the line from categorySelected: ', interest, interestKey, value);
        newInterestState[interest]['subCategorySelected'] = false;
        newInterestState[interest]['description'] = null;
      }
      if (interestKey == 'subCategorySelected') {
        console.log('changing down the line from subCategorySelected: ', interest, interestKey, value);
        newInterestState[interest]['description'] = null;
      }
    }
    this.setState({interests: newInterestState});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B400FF',
  },
  intentionButton:{
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#e06457',
    backgroundColor: 'white'
  },
  intentionText: {
    color: '#e06457',
    fontSize: 14,
    textAlign: 'center',
  },
  intentionTextSelected: {
    color: '#e06457',
    fontSize: 14,
    textAlign: 'center',
  },
  interestContainer: {
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
  },
  textHeading: {
    fontWeight: 'bold',
  },
  viewFields:{
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 10
  }
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUserDetails: (intention) => dispatch(updateUserDetails(intention)),
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
