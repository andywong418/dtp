import React from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import moment from 'moment';
import { FormattedDate } from 'react-intl';

export default class ChatroomMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.item}>
				<View style={styles.messageHeader}>
					<Text style={styles.author}>
						{this.props.author}
					</Text>
					<Text style={{ color: '#888' }}>
						{moment(this.props.date).format('h:mm A')}
					</Text>
				</View>
				<Text style={styles.content}>
					{this.props.content}
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	messageHeader: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	item: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#ddd'
	},
	author: {
		fontWeight: 'bold'
	},
	content: {
		paddingTop: 5
	}
})