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
} from 'native-base'
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
import IntentionButton from '../components/IntentionButton';
import { Dropdown } from 'react-native-material-dropdown';
import { categories, subCategories } from '../constants/Categories';
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

    const { user } = this.props.user;
    if (user) {
      if (user.data) {
        return (
          <ScrollView>
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
                    <Dropdown onChangeText={(value, index, data) => this._changeInterestState('interest1', 'categorySelected', value)} data={categories} label="Main Categories" containerStyle={{ flex: 1, paddingTop: 0 }} itemCount={6} />
                    {this.state.interests.interest1.categorySelected ? <Dropdown onChangeText={(value, index, data) => this._changeInterestState('interest1', 'subCategorySelected', value)} containerStyle={{ marginLeft: 5 }} data={subCategories[this.state.interests.interest1.categorySelected]} label="Sub Categories" containerStyle={{ flex: 1 }} itemCount={6} /> : null}
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
          </ScrollView>
        )
      }

    }
    return (
      <View>
        <Text>Loading...</Text>
        <Body>
          <Button
            title="Logout"
            onPress={() => this._handleLogout()}
          />
        </Body>
      </View>
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

  _handleIntentionChoice = async (choice) => {
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

  _changeInterestState = async (interest, interestKey, value) => {
    var newInterestState = Object.assign({}, this.state.interests);
    newInterestState[interest] = Object.assign({}, newInterestState[interest]);
    newInterestState[interest][interestKey] = value
    this.setState({ interests: newInterestState });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B400FF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  textHeading: {
    fontWeight: 'bold',
  },
  intentionButton: {
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
  viewFields: {
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
