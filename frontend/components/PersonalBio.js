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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 150,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10,
    paddingLeft:10,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {
      height: 12,
      width: 2,
    },
    fontSize: 18,
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewFields: {
    flexDirection: 'column',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 45,
  },
});
