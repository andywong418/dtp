import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import { connect } from 'react-redux';

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  static navigationOptions = {
    title: 'Messages'
  }

  goToDM = (userToSend) => {
    this.props.navigation.navigate(
      'DirectMessage',
      {
        user: this.props.user.user,
        messageTo: {user: userToSend},
      })
  }

  componentWillMount = async () => {
    try {
      let response = await axios.post('http://10.2.106.85:3000/api/users/fetchAll')
      this.setState({users: response.data})
    }
    catch (e) {
      console.log('error in ConversationScreen componentWillMount: ', e);
    }

  }

  render() {
    return (
      <View>
        {this.state.users.map(user => (
          <TouchableOpacity
            key={user._id}
            style={styles.conversationCardContainer}
            onPress={() => this.goToDM(user)}
          >
            <Image
              source={{uri: user.photos[0].url}}
              style={styles.tumbnail}
            />
            <Text style={styles.text}>{user.bio}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conversationCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 100,
    width: width,
    borderColor:'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  tumbnail: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:80,
    borderRadius:40,
    marginLeft:10,
    marginRight:20,
  },
  text: {
    fontSize: 18,
    width: width*.7,
  }
})

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, null)(ConversationScreen);
