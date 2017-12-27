import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity
				onPress={() => (this.props.joinRoom(this.props.roomTopic))}
			>
				<Text style={styles.item}>
					{this.props.roomTopic}
				</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	item: {
		padding: 10,
		paddingTop: 15,
		paddingBottom: 15,
		fontSize: 18,
		borderBottomWidth: 1,
		borderColor: '#ddd'
	},
})