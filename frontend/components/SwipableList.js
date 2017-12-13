import React from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import Swiper from 'react-native-swiper';
import Picture from './Picture';
export default class SwipableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserCard: this.props.users[0]
    }
  }
  componentWillReceiveProps() {
    //setting state of currentusercard.
  }
  render() {
    return (
        <View style={{padding: 15, display:'flex', flexDirection: 'column',
         height: '100%',
      width: '100%', alignItems: 'stretch'}} >
            <View
              style={styles.slide}
              key={this.state.currentUserCard.user.photos[0].url}
            >
                <Image
                  source={
                    this.state.currentUserCard.user.photos[0].url
                    ? {uri: this.state.currentUserCard.user.photos[0].url}
                    : require('../assets/images/icon.png')
                  }
                  style={styles.picture}
                />

            </View>
            <View style={{flex:1,  flexDirection:'row', alignItems:'center', width: '100%', justifyContent:'space-around'}}>


                <TouchableOpacity>
                    <Text> Avoid </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text> Meet </Text>
                </TouchableOpacity>
            </View>
        </View>


    )
  }
}

const styles = StyleSheet.create({
  slide: {
    flexDirection: 'row',
    flex: 4,
  },
  picture: {
    flex: 1,
    height: 420,
    borderRadius: 10
  }
});
