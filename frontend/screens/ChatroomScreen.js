import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	AsyncStorage,
	KeyboardAvoidingView,
	ScrollView,
	FlatList,
	Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import ChatroomMessage from '../components/ChatroomMessage';
import io from 'socket.io-client';

class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: props.navigation.state.params.city,
			topic: props.navigation.state.params.topic,
			userID: props.user.user.data.facebookId,
			roomID: null,
			checkedUsername: false,
			username: null,
			message: '',
			socket: io('http://10.2.106.85:3000/'),
			messages: [
				{
					author: 'Obadah',
					content: 'im so cool',
					date: new Date()
				},
				{
					author: 'Kobie',
					content: 'hes so cool',
					date: new Date()
				},
				{
					author: 'Andros',
					content: 'how does this work',
					date: new Date()
				}
			]
		}
	}

	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.city} | ${navigation.state.params.topic}`
	})

	async componentWillMount() {
		try {
			let roomIDResponse = await axios.post('http://10.2.106.85:3000/api/chatrooms/roomExists', {
				city: this.state.city,
				topic: this.state.topic
			});
			let roomID = roomIDResponse.data.id,
				created = roomIDResponse.data.created;
			this.setState({ roomID }, async () => {
				this._checkUsername();
				console.log('Entering the room', roomIDResponse.data.id)
				this.state.socket.emit('CHAT_ENTER', roomIDResponse.data.id);
			})
			this.state.socket.on('MESSAGE_SENT', message => {
				console.log('Got a message!')
				let newMessages = this.state.messages.slice();
				newMessages.push(message);
				this.setState({ messages: newMessages })
			});
		}
		catch (e) {
			console.log('error', e);
		}
	}

	componentWillUnmount() {
		this.state.socket.emit('CHAT_LEAVE', this.state.roomID);
	}

	_fetchMessages = () => {
		axios.get('http://10.2.106.85:3000/api/messages/fetchConversation?roomId=' + this.state.roomID)
			.then(response => {
				console.log('RESPONSE:', response);
				// this.setState({
				// 	messages: response.data.messages
				// })
			})
	}

	_checkUsername = async () => {
		let userExistsResponse = await axios.post('http://10.2.106.85:3000/api/chatrooms/roomUsername', {
			roomID: this.state.roomID,
			userID: this.state.userID
		});
		this.setState({
			checkedUsername: true
		}, async () => {
			if (userExistsResponse.data.username) {
				this.setState({
					username: userExistsResponse.data.username
				})
			}
		})
	}

	_generateUsername = () => {
		this.props.navigation.navigate('UsernameGenerator', {
			roomID: this.state.roomID,
			userID: this.state.userID,
			city: this.state.city,
			topic: this.state.topic,
			setUsername: (username) => this._setUsername(username)
		})
	}

	_setUsername = async (username) => {
		let success = await this.setState({
			username
		})
	}

	_sendMessage = (message) => {
		if (this.state.username) {
			let newMessage = {
				author: this.state.username,
				content: this.state.message,
				roomID: this.state.roomID,
				sentAt: new Date()
			}
			this.state.socket.emit('SEND_MESSAGE', newMessage)
			let newMessages = this.state.messages.slice();
			newMessages.push(newMessage);
			this.setState({ messages: newMessages })
			this.setState({
				message: ''
			})
		} else {
			if (!this.state.checkedUsername) {
				this._checkUsername();
			} else {
				Keyboard.dismiss();
				this._generateUsername();
			}
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80} behavior="padding" >
				<View style={styles.usernameContainer}>
					<Text style={styles.username}>
						{this.state.username ? this.state.username : ''}
					</Text>
				</View>
				<View style={styles.messagesContainer}>
					<FlatList
						data={this.state.messages}
						renderItem={({ item }) => <ChatroomMessage author={item.author} content={item.content} date={item.date} />}
						keyExtractor={(item, index) => index}
					/>
				</View>
				<View style={styles.sendBar}>
					<TextInput
						style={styles.textInput}
						value={this.state.message}
						onChangeText={(message) => this.setState({ message })}
						placeholder="Type something.."
						returnKeyType="send"
						underlineColorAndroid="transparent"
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this._sendMessage()}
					>
						<Text style={styles.text}>
							Send
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	usernameContainer: {
		paddingTop: 10,
		paddingBottom: 5
	},
	username: {
		color: '#B400FF',
		fontSize: 18,
		textAlign: 'right',
		paddingRight: 10,
		fontWeight: 'bold'
	},
	messagesContainer: {
		flex: 12,
	},
	sendBar: {
		height: 65,
		bottom: 0,
		width: '100%',
		backgroundColor: '#d3d3d3',
		padding: 13,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		backgroundColor: 'white',
		height: 40,
		borderRadius: 5,
		flex: 3,
		marginRight: 5,
		paddingLeft: 10,
		fontSize: 16
	},
	message: {
		fontSize: 20
	},
	button: {
		flex: 1,
		height: 40,
		backgroundColor: '#3cb2e2',
		justifyContent: 'center',
		borderRadius: 5
	},
	text: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	}
})

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, null)(Chatroom);