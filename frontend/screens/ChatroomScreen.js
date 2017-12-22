import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	AsyncStorage,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: props.navigation.state.params.city,
			topic: props.navigation.state.params.topic,
			userID: props.user.user.data.facebookId,
			//FIXME: grab the user from asyncstorage instead
			roomID: null,
			username: null,
			messages: []
		}
	}

	async _setUsername(username) {
		let success = await this.setState({
			username
		})
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
			this.setState({
				roomID: roomID
			}, async () => {
				if (created) {
					console.log('Room was just created!');
				} else {
					let userExistsResponse = await axios.post('http://10.2.106.85:3000/api/chatrooms/roomUsername', {
						roomID,
						userID: this.state.userID
					});
					this.setState({
						username: userExistsResponse.data.username
					})
					if (!userExistsResponse.data.username) {
						this.props.navigation.navigate('UsernameGenerator', {
							roomID: this.state.roomID,
							userID: this.state.userID,
							city: this.state.city,
							topic: this.state.topic,
							setUsername: (username) => this._setUsername(username)
						})
					}
				}
			})
		}
		catch (e) {
			console.log('error', e);
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={80} behavior="padding">
				<View style={styles.messagesContainer}>

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
