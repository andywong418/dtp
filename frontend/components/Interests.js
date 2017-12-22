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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeading}>3 main interests</Text>
        </View>
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
  container: {
    paddingBottom:15,
    marginBottom:15,
  },
  header:{
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  textHeading: {
    fontWeight: 'bold',
  },
});
