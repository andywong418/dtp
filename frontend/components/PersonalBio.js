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
      <View style={{margin: 20}}>
        <Text style={styles.textHeading}>Personal Bio</Text>
        <TextInput
          value={this.props.value}
          // placeholder={this.props.placeholder}
          style={{backgroundColor: 'white'}}
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
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 10
  }
});
