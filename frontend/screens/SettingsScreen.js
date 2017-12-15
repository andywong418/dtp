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
  updateUserDetails,
} from '../actions/index';
<<<<<<< HEAD
import {
  WebBrowser,
  ImagePicker,
} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picture from '../components/Picture';
import IntentionButton from '../components/IntentionButton';
import { Dropdown } from 'react-native-material-dropdown';
import { subCategories, categories } from '../constants/Categories';
const { width } = Dimensions.get('window')

=======
import PersonalPictureSwiper from '../components/PersonalPictureSwiper';
import Intentions from '../components/Intentions';
import Interests from '../components/Interests';
import PersonalBio from '../components/PersonalBio';
import LogoutButton from '../components/LogoutButton';
import SaveSettingsButton from '../components/SaveSettingsButton';
import axios from 'axios';
>>>>>>> ffd8d2bddbedfa0a7261d7cc9b5157c03fbd323a

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
      bio: '',
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
    this.props.updateUserDetails(this.state.intention)
    let user = AsyncStorage.getItem('user');
    let response = await axios.post(
      'http://10.2.106.70:3000/api/users/updateProfile',
      {
        facebookId: user.id,
        intention: this.state.intention,
        interests: this.state.interests,
        bio: this.state.bio,
      }
    )
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
    // TODO: grab settings from global state
  }

  componentWillUmount = () => {
    this.props.updateUserDetails(this.state.intention)
  }

  render() {
    //TODO pictures editing

    const {user} = this.props.user;
    console.log(user ? 'user exists' : 'user does not exist')
    if(user){
      if(user.data) {
        return (
          <ScrollView>
<<<<<<< HEAD
            <View>
              {
                user.data.photos
                  ?
                  <Swiper height={300}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#B400FF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                      bottom: -23, left: null, right: 10
                    }} loop>
                    {user.data.photos.map(photo => {
                      return (
                        <View
                          style={styles.slide}
                          key={photo.url}
                        >
                          <Picture
                            imageUri={photo.url}
                            date={photo.date}
                          />
                        </View>
                      )
                    }
                    )}
                  </Swiper>
                  :
                  <Swiper height={300}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#B400FF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                      bottom: -23, left: null, right: 10
                    }} loop>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                      <Picture key={1} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                      <Picture key={2} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                      <Picture key={3} />
                    </View>
                  </Swiper>
              }
              <View>
                <View style={styles.viewFields}>
                  <Text style={styles.textHeading}>
                    Intention
                  </Text>
                  <Icon name="question-circle" style={{ marginLeft: 5, marginTop: 2 }} size={16} />
                </View>
                <View style={{ flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center' }}>
                  {this.state.intentions.map(intention => {
                    return (
                      <IntentionButton
                        intention={intention.name}
                        key={intention.name}
                        isSelected={intention.isSelected}
                        _handleIntentionChoice={(intention) => this._handleIntentionChoice(intention)}
                      />
                    )
                  })}
                </View>
              </View>

              <View style={{ marginTop: 20, padding: 10, marginBottom: 10 }}>
                <Text style={styles.textHeading}>
                  Specify your 3 main interests
                </Text>
                <View style={{ marginTop: 20, paddingLeft: 15 }}>
                  <Text>
                    Interest 1:
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <Dropdown onChangeText={(value, index, data) => this._changeInterestState('interest1', 'categorySelected', value)} data={categories} label="Main Categories" containerStyle={{ flex: 1, paddingTop: 0 }} itemCount={6} /> */}
                    {/* {this.state.interests.interest1.categorySelected ? <Dropdown onChangeText={(value, index, data) => this._changeInterestState('interest1', 'subCategorySelected', value)} containerStyle={{ marginLeft: 5 }} data={subCategories[this.state.interests.interest1.categorySelected]} label="Sub Categories" containerStyle={{ flex: 1 }} itemCount={6} /> : null} */}
                  </View>
                  {this.state.interests.interest1.subCategorySelected ? <TextInput style={{ backgroundColor: 'white' }} editable={true} maxLength={140} multiline={true} numOfLines={3} onChangeText={(text) => this._changeInterestState('interest1', 'value', text)} /> : null}
                </View>
              </View>
            </View>
            <List style={{ marginTop: 100 }}>
              <ListItem style={{ marginLeft: 0 }}>
                <Body>
                  <Button
                    title="Logout"
                    onPress={() => this._handleLogout()}
                  />
                </Body>
              </ListItem>
            </List>
=======
            <PersonalPictureSwiper
              photos={user.data.photos}
            />
            <Intentions
              intentions={this.state.intentions}
              _handleIntentionChoice={(intention) => this._handleIntentionChoice(intention)}
            />
            <Interests
              interests={this.state.interests}
              _changeInterestState={(interest, interestKey, value) => this._changeInterestState(interest, interestKey, value)}
            />
            <PersonalBio
              setBio={(value) => this._setBio(value)}
            />
            <LogoutButton />
>>>>>>> ffd8d2bddbedfa0a7261d7cc9b5157c03fbd323a
          </ScrollView>
        )
      }

    }
    return (
      <ScrollView>
        <Text>Loading...</Text>
<<<<<<< HEAD
        <Text>OBADAH...</Text>
        <Body>
          <Button
            title="Logout"
            onPress={() => this._handleLogout()}
          />
        </Body>
      </View>
=======
        <LogoutButton/>
      </ScrollView>
>>>>>>> ffd8d2bddbedfa0a7261d7cc9b5157c03fbd323a
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


const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUserDetails: (intention) => dispatch(updateUserDetails(intention)),
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
