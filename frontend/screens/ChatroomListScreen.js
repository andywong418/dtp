import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	FlatList,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import ListItem from '../components/ListItem';

let roomNames = [
	'Art',
	'Books',
	'Food',
	'Gaming',
	'Movies',
	'Music',
	'Programming',
	'Sports',
	'Subject'
];

class ChatroomListScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	joinRoom = (topic) => {
		this.props.navigation.navigate('Chatroom', { city: this.props.location.city, topic })
	}

	static navigationOptions = {
		title: 'Chatrooms'
	};

	render() {
		return (
			<View style={styles.container}>
				{
					!this.props.location.city
						?
						<ActivityIndicator size="large" color="#B400FF" />
						:
						<View>
							<Text style={styles.city}>{this.props.location.city}</Text>
							<FlatList
								data={roomNames}
								renderItem={({ item }) => <ListItem roomTopic={item} joinRoom={this.joinRoom} />}
								keyExtractor={(item, index) => index}
							/>
						</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	cityContainer: {
		flex: 1
	},
	city: {
		fontSize: 30,
		color: '#B400FF',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	topicContainer: {
		flex: 7
	}
})

const mapStateToProps = (state) => ({
	location: state.location
});

export default connect(mapStateToProps, null)(ChatroomListScreen);


{/* {
	!this.props.location.city
		?
		<ActivityIndicator size="large" color="#B400FF" />
		:
		<View>
			<View style={styles.cityContainer}>
				<Text style={styles.city}>{this.props.location.city}</Text>
			</View>
			<View style={styles.topicContainer}>
				<FlatList
					data={roomNames}
					renderItem={({ item }) => <ListItem roomTopic={item} joinRoom={this.joinRoom} />}
					keyExtractor={(item, index) => index}
				/>
			</View>
		</View>
} */}
