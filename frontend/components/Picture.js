import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUri: undefined,
    }
    if(this.props.imageUri){
      this.state.imageUri = this.props.imageUri;
    }
  }
  render() {

    return (
      <TouchableOpacity
        onPress={() => this._handlePress()}
      >
      <Image
        source={
          this.state.imageUri
          ? { uri: this.state.imageUri }
          : require('../assets/images/icon.png')
        }
        style={{width: 200, height: 200}}
      />
      </TouchableOpacity>
    )
  }

  _handlePress = () => {
    console.log('picure pressed');
    if (!this.state.imageUri) {

    }
  }
}
