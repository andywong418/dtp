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
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MatchModal from './MatchModal';
import Picture from './Picture';


export default class SwipableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUserCard: this.props.users[0],
      modalMatch: false
    }
  }
  componentWillReceiveProps(nextProps) {
    //setting state of currentusercard.
    this.setState({currentUserCard: nextProps.users[0]});
  }

  clickYesOnUser = async (user) => {
    if(this.state.currentUserCard.matchme) {
      var self = this;
      this.setState({modalMatch: true}, async () => {
        await axios.post('http://10.2.106.91:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: true})
      });
    } else {
      await axios.post('http://10.2.106.91:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: true})
      this.props.meet(this.state.currentUserCard);
    }

  }

  clickNoOnUser= async (user) => {
    await axios.post('http://10.2.106.91:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: false})
    this.props.reject(this.state.currentUserCard)
  }

  closeModal = () => {
    this.setState({modalMatch: false});
    this.props.meet(this.state.currentUserCard);
  }
  render() {
    if (!this.state.currentUserCard) {
      return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems:'center', height: '100%'}}>
          <View style={{justifyContent: 'center', alignItems:'center'}}>
            <Icon name='account-box' size ={150} color='grey'/>
            <Text style={{fontSize: 16, marginTop: 20}}>  No more users in your area - try moving around! </Text>
          </View>
        </View>
      )
    }
    return (
      <View>
        {
          this.state.modalMatch ?

          <MatchModal closeModal={this.closeModal} user={this.props.user} currentUserCard={this.state.currentUserCard}/>
          :
          <ScrollView style={{padding: 15, display:'flex', flexDirection: 'column',
           height: '100%',
        width: '100%',}} >
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
              <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 20}}>
                <View flexDirection='row'>
                  <Icon name='room' size={25} color='grey'></Icon>
                  <Text style={styles.belowCardInfo}> {this.state.currentUserCard.distance} Feet Away</Text>
                </View>

                <View flexDirection='row'>
                  <Icon name='face' size={25} color='grey'></Icon>
                  <Text style={styles.belowCardInfo}> {this.state.currentUserCard.user.peopleMet ? this.state.currentUserCard.user.peopleMet + ' people met' : 'New User' } </Text>
                </View>
              </View>
              <View style={{flex:1,  flexDirection:'row', alignItems:'center', width: '100%', justifyContent:'space-around', marginTop: 20}}>

                  <TouchableOpacity style={styles.meetButtons} onPress={() => this.clickNoOnUser(this.state.currentUserCard)}>
                    <Icon color='red' name='clear' size={30}>
                    </Icon>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.meetButtons} onPress={() => this.clickYesOnUser(this.state.currentUserCard)}>
                    <Icon color='green' name='done' size={40}>
                    </Icon>
                  </TouchableOpacity>
              </View>
          </ScrollView>
        }
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
    height: 300,
    borderRadius: 10
  },
  belowCardInfo: {
    fontWeight: '100',
    fontSize: 15,
    color: 'grey',
    paddingTop: 3
  },
  meetButtons: {
        borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       height:70,
       backgroundColor:'#fff',
       borderRadius:70,
  }
});
