import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeading}>Personal Bio</Text>
        </View>
        <View style={styles.viewFields}>
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
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 150,
    marginTop: 10,
    padding: 5,
  },
  textHeading: {
    fontWeight: 'bold',
  },
  viewFields:{
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 45,
  },
});
