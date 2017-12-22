import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageLists: []
    }
  }
  static navigationOptions = {
    title: 'Chats'
  }
  render() {
    //console.log("this. props", this.props)
    return (
      <View>
      {this.state.messageLists.map(message => {
        <View>
        </View>
      })}

      </View>
    )
  }
}
