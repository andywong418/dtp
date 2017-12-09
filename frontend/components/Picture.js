import React from 'react';
import {
  // Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  // Button,
} from 'react-native';
import {
  Container,
  Button,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Spinner,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';


export default class Picture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUri: undefined,
    }
    if(this.props.imageUri) this.state.imageUri = this.props.imageUri;
  }
  render() {
    // const stuff = (
    //   <TouchableOpacity
    //   onPress={() => this._handlePress()}
    //   >
    //     <Image
    //     source={
    //       this.state.imageUri
    //       ? { uri: this.state.imageUri }
    //       : require('../assets/images/icon.png')
    //     }
    //     style={{width: 200, height: 200}}
    //     />
    //   </TouchableOpacity>
    // )

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this._handlePress()}
      >
        <Image
          source={
            this.state.imageUri
            ? { uri: this.state.imageUri }
            : require('../assets/images/icon.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
    )
  }

  _handlePress = () => {
    console.log('picure pressed');

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    height: 300,
    width: 200,
  }
});
