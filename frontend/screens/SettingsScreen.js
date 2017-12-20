import React from 'react';
import {
  AsyncStorage,
  Button,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
  callLogout,
  updateUserInfo,
} from '../actions/index';
import PersonalPictureSwiper from '../components/PersonalPictureSwiper';
import Intentions from '../components/Intentions';
import Interests from '../components/Interests';
import PersonalBio from '../components/PersonalBio';
import LogoutButton from '../components/LogoutButton';
import SaveSettingsButton from '../components/SaveSettingsButton';
import axios from 'axios';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    // kept inside the local state
    // will be transferred upon unmounting or hitting save button
    this.state = {
      intention: this.props.user.intention,
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
      interests: this.props.user.interests,
      bio: this.props.user.bio,
    }
  }

  checkSettingsFinished = () => {
    return (
      this.state.interests.interest1.categorySelected &&
      this.state.interests.interest1.subCategorySelected &&
      this.state.interests.interest1.description &&
      this.state.interests.interest2.categorySelected &&
      this.state.interests.interest2.subCategorySelected &&
      this.state.interests.interest2.description &&
      this.state.interests.interest3.categorySelected &&
      this.state.interests.interest3.subCategorySelected &&
      this.state.interests.interest3.description &&
      this.state.bio
    )
  }

  _handleSave = async () => {
    // TODO: check if everything is filled out
    // TODO: save settings to global setState
    // this.props.updateUserInfo(this.state.intention)
    this.props.updateUserInfo(this.state.intention, this.state.interests, this.state.bio)
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      await axios.post(
        'http://10.2.106.85:3000/api/users/updateProfile',
        {
          facebookId: user.id,
          intention: this.state.intention,
          interests: this.state.interests,
          bio: this.state.bio,
        }
      )
    }
    catch (e) {
      console.log("error in save settings: ", e);
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Settings',
      headerRight: <SaveSettingsButton handleSave={() => navigation.state.params._handleSave() } />,
    }
  }

  componentDidMount = () => {
    console.log('this.props.user in SETTING componentDidMount: ', this.props.user);
    this.props.navigation.setParams({
      _handleSave: this._handleSave,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('settings getting new props: ', nextProps.user.bio);
    this.setState({
      intention: nextProps.user.intention,
      showIntentionHelperText: false,
      intentions: [
        {
          name: 'Open Minded',
          isSelected: nextProps.user.intention == 'Open Minded',
        },
        {
          name: 'Friendship',
          isSelected: nextProps.user.intention == 'Friendship',
        },
        {
          name: 'Dating',
          isSelected: nextProps.user.intention == 'Dating',
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
      bio: nextProps.user.bio,
    })
  }

  componentWillUmount = () => {
    this.props.updateUserInfo(this.state.intention)
  }

  render() {
    //TODO pictures editing

    const {user} = this.props.user;
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
            <Interests
              interests={this.state.interests}
              _changeInterestState={(interest, interestKey, description) => this._changeInterestState(interest, interestKey, description)}
            />
            <PersonalBio
              value={this.state.bio}
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

  _changeInterestState = (interest, interestKey, description) => {
    let newInterestState = Object.assign({}, this.state.interests);
    newInterestState[interest] = Object.assign({}, newInterestState[interest]);
    newInterestState[interest][interestKey] = description
    if (newInterestState[interest][interestKey] != this.state.interests[interest][interestKey]) {
      if (interestKey == 'categorySelected') {
        console.log('changing down the line from categorySelected: ', interest, interestKey, description);
        newInterestState[interest]['subCategorySelected'] = false;
        newInterestState[interest]['description'] = null;
      }
      if (interestKey == 'subCategorySelected') {
        console.log('changing down the line from subCategorySelected: ', interest, interestKey, description);
        newInterestState[interest]['description'] = null;
      }
    }
    this.setState({interests: newInterestState});
    console.log(this.state.interests);
  }
}


const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (intention, interests, bio) => dispatch(updateUserInfo(intention, interests, bio)),
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
