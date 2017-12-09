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

    const {user} = this.props.user;
    if(user){
      if(user.data) {
        console.log(user.data.photos);
        return (
          <ScrollView>
            <View>
              {
                user.data.photos
                ?
                <Swiper height={300}
                  dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  activeDot={<View style={{backgroundColor: '#B400FF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  paginationStyle={{
                    bottom: -23, left: null, right: 10
                  }} loop>
                  {user.data.photos.map(photo => { return (
                      <View
                        style={styles.slide}
                        key={photo.url}
                      >
                        <Picture
                        imageUri={photo.url}
                        date={photo.date}
                        />
                      </View>
                    )}
                  )}
                </Swiper>
                :
                <Swiper height={300}
                  dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  activeDot={<View style={{backgroundColor: '#B400FF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                  paginationStyle={{
                    bottom: -23, left: null, right: 10
                  }} loop>
                  <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                    <Picture key={1}/>
                  </View>
                  <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                    <Picture key={2}/>
                  </View>
                  <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                    <Picture key={3}/>
                  </View>
                </Swiper>
              }
              <View>
                <View style={{flexDirection: 'row', marginTop: 20, paddingLeft: 10, marginBottom: 10}}>
                  <Text style={styles.textHeading}>
                  Intention
                  </Text>
                  <Icon name="question-circle" style={{marginLeft: 5, marginTop: 2}} size={16}/>
                </View>
                <View style={{flexDirection: 'row', padding: 10, paddingTop: 0, alignItems: 'center'}}>
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
            </View>
            <List style={{marginTop: 30}}>
              <ListItem style={{marginLeft: 0}}>
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
