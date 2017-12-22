import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
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
import Loading from '../components/Loading';
import SaveSettingsButton from '../components/SaveSettingsButton';
import axios from 'axios';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    // kept inside the local state
    // will be transferred upon unmounting or hitting save button
    this.state = {
      intention: props.user.intention,
      showIntentionHelperText: false,
      intentions: [
        {
          name: 'Open Minded',
          isSelected: props.user.intention == 'Open Minded',
        },
        {
          name: 'Friendship',
          isSelected: props.user.intention == 'Friendship',
        },
        {
          name: 'Dating',
          isSelected: props.user.intention == 'Dating',
        },
      ],
      interests: props.user.interests,
      bio: props.user.bio,
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
    //console.log('\n\nHANDLE SAVE CALLED\n\n');
    //console.log(this.state.intention);
    //console.log(this.state.interests);
    //console.log(this.state.bio);
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

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerRight: <SaveSettingsButton handleSave={() => navigation.state.params._handleSave()} />,
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      _handleSave: this._handleSave,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log('nextProps in componentWillReceiveProps: ', nextProps.user.interests);
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
      interests: nextProps.user.interests,
      bio: nextProps.user.bio,
    })
  }

  componentDidUpdate = () => {
    //console.log('\n\n\nthis.state.interests in SettingsScreen componentDidUpdate: \n\n\n', this.state.interests);
  }

  componentWillUmount = () => {
    this.props.updateUserInfo(this.state.intention)
  }

  render() {
    const { user } = this.props.user;
    if (!user || !user.data) {
      return (
        <Loading />
      )
    }
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

  _setBio = (value) => {
    this.setState({ bio: value })
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
    //console.log("interest HIT ME", interest);
    let newInterestState = Object.assign({}, this.state.interests);
    newInterestState[interest] = Object.assign({}, newInterestState[interest]);
    newInterestState[interest][interestKey] = description
    if (newInterestState[interest][interestKey] != this.state.interests[interest][interestKey]) {
      if (interestKey == 'categorySelected') {
        newInterestState[interest]['subCategorySelected'] = false;
        newInterestState[interest]['description'] = null;
      }
      if (interestKey == 'subCategorySelected') {
        newInterestState[interest]['description'] = null;
      }
    }
    this.setState({ interests: newInterestState });
    // //console.log(this.state.interests);
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
