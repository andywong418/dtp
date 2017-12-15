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
      <View>
        <View style={styles.viewFields}>
          <Text style={styles.textHeading}>Intention</Text>
          <Icon
            name="question-circle"
            style={styles.icon}
            size={16}
          />
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
  },
  viewFields:{
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 10
  }
});
