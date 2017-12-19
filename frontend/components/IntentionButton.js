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
  // puke-red color: #E06457
  intentionButton:{
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B400FF',
    backgroundColor: 'white'
  },
  intentionButtonSelected:{
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#B400FF'
  },
  intentionText: {
    color: '#B400FF',
    fontSize: 14,
    textAlign: 'center',
  },
  intentionTextSelected: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
