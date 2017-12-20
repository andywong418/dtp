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

  }

  render() {
    console.log("this. props", this.props)
    return (
      <View>
      <Text>Hello</Text>

      </View>
    )
  }
}
