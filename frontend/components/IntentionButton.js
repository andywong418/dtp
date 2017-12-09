import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class IntentionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
    }
  }

  componentWillMount = () => {
    console.log('mounting');
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.isSelected ? styles.intentionButtonSelected : styles.intentionButton}
        onPress={() => this.props._handleIntentionChoice(this.props.intention)}
      >
        <Text style={this.props.isSelected ? styles.intentionTextSelected : styles.intentionText}>
          {this.props.intention}
        </Text>
      </TouchableOpacity>
    )
  }

  _handleIntentionChoice = (choice) => {
    console.log(choice);
    this.setState({isSelected:!this.state.isSelected,})
  }
}

const styles = StyleSheet.create({
  intentionButton:{
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#e06457',
    backgroundColor: 'white'
  },
  intentionButtonSelected:{
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#e06457'
  },
  intentionText: {
    color: '#e06457',
    fontSize: 14,
    textAlign: 'center',
  },
  intentionTextSelected: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
