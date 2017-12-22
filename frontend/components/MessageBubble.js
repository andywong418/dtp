import React from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput
} from 'react-native';

export default class MessageBubble extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log("this.props", this.props.message.senderUser);
    console.log("me", this.props.user);

    if(this.props.message.author._id === this.props.user._id || this.props.message.author === this.props.user._id) {
      return(
        <View style={styles.userMessage}>
          <Text style={styles.userMessageText}>{this.props.message.content}</Text>
        </View>
      )
    }
    return(
        <View style={{flexDirection: 'row', marginTop: 20,}}>
          <Image
            source={
              this.props.message.senderUser
              ? {uri: this.props.message.senderUser.photos[0].url}
              : {uri: this.props.message.author.photos[0].url}
            }
            style={styles.smallImage}
          />
          <View style={styles.partnerMessage}>
            <Text style={styles.partnerMessageText}>{this.props.message.content}</Text>
          </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
  userMessage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#B400FF',
    padding: 15,
    borderRadius: 7,
    maxWidth: '60%',
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  userMessageText: {
    fontSize: 18,
    color: 'white',
    flex: 1,
    alignSelf: 'center'
  },
  partnerMessage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#f1f0f0',
    padding: 7,
    borderRadius: 7,
    maxWidth: '60%'
  },
  partnerMessageText: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center'
  },
  smallImage: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:50,
      height:50,
      borderRadius:25,
  },


});
