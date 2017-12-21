import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Location,
} from 'expo';
import { connect } from 'react-redux';
import {
  callLogout,
  updateUserInfo,
  callLogin,
  fetchUserFromDB,
  updateLocation,
  getNearbyUsers,
} from '../actions/index';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
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
      isSaving: false,
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

  updateLocationDB = async (location, id) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    let response = await axios.post(
      'http://10.2.106.85:3000/api/users/updateLocation',
      {
        facebookId: id,
        lat,
        lng
      }
    )
    let city = response.data;
    return {
      lat,
      lng,
      city
    };
  };

  getNearbyUsersDB = async (location, facebookId) => {
    let response = await axios.post(
      'http://10.2.106.85:3000/api/users/getNearbyUsers',
      {
        facebookId,
        location
      }
    );

    let users = response.data;
    return users;
  }

  _handleSave = async () => {
    console.log(this.state.isSaving);
    this.setState({isSaving:true})
    console.log(this.state.isSaving);
    this.props.updateUserInfo(this.state.intention, this.state.interests, this.state.bio)
    try {
      let userJson = await AsyncStorage.getItem('user');
      user = JSON.parse(userJson);
      console.log('user from AsyncStorage');
      await axios.post(
        'http://10.2.106.85:3000/api/users/updateProfile',
        {
          facebookId: user.id,
          intention: this.state.intention,
          interests: this.state.interests,
          bio: this.state.bio,
        }
      )
      console.log('settings sent to db');
      let coords = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log('location retrieved');
      let location = await this.updateLocationDB(coords, user.id);
      console.log('location updated in db');
      let matchUsers = await this.getNearbyUsersDB(location, user.id);
      console.log('matched users retrieved');
      this.props.updateLocation(location)
      this.props.getNearbyUsers(matchUsers);
      this.props.navigation.navigate('Home');
      console.log('navigated to home');
    }
    catch (e) {
      console.log("error in save settings: ", e);
    }
    console.log(this.state.isSaving);
    this.setState({isSaving:false})
    console.log(this.state.isSaving);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Settings',
      headerRight: <SaveSettingsButton handleSave={() => navigation.state.params._handleSave() } />,
    }
  }

  componentDidMount = () => {
    this.props.navigation.setParams({
      _handleSave: this._handleSave,
    })
  }

  componentWillReceiveProps = (nextProps) => {
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

  componentWillUmount = () => {
    this.props.updateUserInfo(this.state.intention)
  }

  render() {
    const {user} = this.props.user;
    if (!user || !user.data) {
      return (
        <Loading style={{height: '100%'}}/>
      )
    }
    return (
      <View>
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
        {
          this.state.isSaving
          ? <View style={styles.overlay}><ActivityIndicator size="large" color="#B400FF" style={{opacity:1}}/></View>
          : null
        }
      </View>
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
    console.log("interest HIT ME", interest);
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
    this.setState({interests: newInterestState});
    // console.log(this.state.interests);
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    height: height*.3,
    left: width*.2,
    top: height*.3,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: width*.6,
    borderRadius:10,
    borderRadius:10,
    borderRadius:10,
  },
});

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (intention, interests, bio) => dispatch(updateUserInfo(intention, interests, bio)),
  callLogout: () => dispatch(callLogout()),
  updateLocation: (location) => dispatch(updateLocation(location)),
  getNearbyUsers: (users) => dispatch(getNearbyUsers(users)),
  fetchUserFromDB: (user) => dispatch(fetchUserFromDB(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
