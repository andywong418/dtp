import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


export default class PersonalBio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.viewFields}>
        <Text style={styles.textHeading}>Personal Bio</Text>
        <TextInput
          value={this.props.value}
          style={styles.text}
          editable={true}
          maxLength={140}
          multiline={true}
          numOfLines={3}
          onChangeText={(text) => this.props.setBio(text)}
        />
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
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    backgroundColor: 'white',
    borderColor: '#B400FF',
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
    borderWidth: 1,
    height: 150,
    marginTop: 10,
    padding: 5,
  },
});
