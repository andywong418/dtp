import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
const io = require('socket.io-client');

export default class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      message: '',
      socket: io('http://10.2.106.91:3000/'),
      roomId: '',
      appState: AppState.currentState,
    }
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  componentDidMount() {
    // this.state.socket.emit('CONNECT')

    var facebookIdArr = [this.props.messageTo.user.facebookId, this.props.user.data.facebookId]
    facebookIdArr.sort()
    var roomName = facebookIdArr.join('-');

    this.state.socket.emit('CHAT_ENTER', roomName);
    this.setState({roomId: roomName});
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange(nextAppState) {
    if ( nextAppState === 'inactive' || nextAppState ==='background') {
      this.state.socket.emit('CHAT_CLOSE', this.state.roomId);
    }
    this.setState({appState: nextAppState});
  }

  sendMessage() {

    this.state.socket.emit('SEND_MESSAGE', {
      author: this.props.user.data.facebookId,
      content: this.state.message,
      roomId: this.state.roomId,
      recipientId: this.props.messageTo.user.facebookId,
      sentAt: new Date()
    })
    this.setState({message: ''})
  }
  changeInput(text) {
    this.setState({message: text});
  }

  componentWillUnmount() {
    this.state.socket.emit('CHAT_CLOSE', this.state.roomId);
  }
  render() {

    return (
      <KeyboardAvoidingView style={{height: '100%', flex: 1}} behavior="padding">
        <View style={styles.navbar}>
          <TouchableOpacity style={{width: 140}} onPress={() => this.props.navigateBackToMessages()}><Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}> Back </Text></TouchableOpacity>

        </View>
        <ScrollView style={styles.messageContainer}>


        </ScrollView>
        <View style={styles.sendBar}>
          <TextInput placeholder="Send a chat..." style={{backgroundColor: 'white', height: 40, borderRadius: 5, flex: 3, marginRight: 5, paddingLeft: 5, fontSize: 16}} value={this.state.message} onChangeText={(text) => this.changeInput(text)}></TextInput>
          <TouchableOpacity onPress= {() => this.sendMessage()} style={{flex: 1, height: 40, backgroundColor: '#3cb2e2', justifyContent: 'center', borderRadius: 5}}><Text style={{textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold'}}>Send</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    paddingTop: 30,
    width: '100%',
    backgroundColor: '#B400FF',
  },
  messageContainer: {

  },
  sendBar:{
    height: 65,
    bottom: 0,
    width: '100%',
    backgroundColor: '#d3d3d3',
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
