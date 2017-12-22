import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	FlatList,
	TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import ListItem from '../components/ListItem';

export default class ChatroomListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		}
	}

	static navigationOptions = {
		title: 'Username Generator'
	};


	async _generateUsername() {
		let username = await axios.get('http://10.2.106.85:3000/api/chatrooms/generateUsername')
		this.setState({
			username: username.data.username
		})
	}
	async _saveUsername() {
		let saveResponse = await axios.post('http://10.2.106.85:3000/api/chatrooms/saveUsername',
			{
				username: this.state.username,
				roomID: this.props.navigation.state.params.roomID,
				userID: this.props.navigation.state.params.userID
			});
		if (saveResponse.data.success) {
			this.props.navigation.state.params.setUsername(this.state.username);
			this.props.navigation.goBack();
		}
	}

	render() {
		return (
			< View style={styles.container} >
				<View style={styles.usernameContainer}>
					<Text style={styles.username}>
						{this.state.username}
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => this._generateUsername()}
					>
						<Text style={styles.button}>
							Generate
					</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.submitContainer}>
					{
						<TouchableOpacity
							onPress={() => this._saveUsername()}
							disabled={!this.state.username}
						>
							<Text style={this.state.username ? styles.button : styles.buttonDisabled}>
								Submit
							</Text>
						</TouchableOpacity>
					}
				</View>
			</View >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30
	},
	usernameContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	username: {
		marginTop: 10,
		fontSize: 40,
		color: '#B400FF',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	buttonContainer: {
		flex: 1,
		display: 'flex',
	},
	submitContainer: {
		flex: 1,
	},
	button: {
		backgroundColor: '#B400FF',
		color: 'white',
		fontSize: 30,
		alignSelf: 'center',
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		borderRadius: 5
	},
	buttonDisabled: {
		backgroundColor: '#ccc',
		color: 'white',
		fontSize: 30,
		alignSelf: 'center',
		padding: 10,
		paddingLeft: 40,
		paddingRight: 40,
		borderRadius: 5
	},
})

// const mapStateToProps = (state) => ({
// 	location: state.location
// });

// export default connect(mapStateToProps, null)(ChatroomListScreen);

// 	< View style = { styles.container } >
// 		<Text style={styles.username}>
// 			{this.state.username}
// 		</Text>
// 		<TouchableOpacity
// 			onPress={this._generateUsername()}
// 		>
// 			Generate
// 				</TouchableOpacity>
// 				{
// 	this.state.username
// 		?
// 		<TouchableOpacity
// 			onPress={this._saveUsername()}
// 		>
// 			Submit
// 					</TouchableOpacity>
// 		:
// 		''
// }
// 			</View >

