import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IntentionButton from '../components/IntentionButton';


export default class Intentions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeading}>Goal</Text>
        </View>
        <View style={styles.intentionList}>
          {this.props.intentions.map(intention => {
            return (
              <IntentionButton
                intention={intention.name}
                key={intention.name}
                isSelected={intention.isSelected}
                _handleIntentionChoice={(intention) => this.props._handleIntentionChoice(intention)}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:5,
    paddingBottom:15,
    marginTop:20,
    marginBottom:15,
  },
  icon: {
    marginLeft: 5,
    marginTop: 2,
  },
  intentionList: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    alignItems: 'center',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  header:{
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  }
});
