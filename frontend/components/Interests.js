import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InterestSelector from './InterestSelector';

export default class Intentions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.interestContainer}>
        <Text style={styles.textHeading}>Specify your 3 main interests</Text>
        {Object.keys(this.props.interests).map(interest => {
          return (
            <InterestSelector
              key={interest}
              interestName={interest}
              interest={this.props.interests[interest]}
              changeInterestState={(interestKey, value) => this.props._changeInterestState(interest, interestKey, value)}
            />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  interestContainer: {
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
  },
  textHeading: {
    fontWeight: 'bold',
  },
});
