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
      <View style={styles.border}>
        <View style={styles.viewFields}>
          <Text style={styles.textHeading}>Intention</Text>
          <Icon
            name="question-circle"
            style={styles.icon}
            size={15}
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
  border: {
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingTop:5,
    paddingBottom:15,
    marginTop:45,
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
  },
  viewFields:{
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
