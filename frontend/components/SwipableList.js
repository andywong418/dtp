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
import PersonalPictureSwiper from './PersonalPictureSwiper';
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
        await axios.post('http://10.2.106.85:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: true})
      });
    } else {
      await axios.post('http://10.2.106.85:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: true})
      this.props.meet(this.state.currentUserCard);
    }

  }

  clickNoOnUser= async (user) => {
    await axios.post('http://10.2.106.85:3000/api/matches/updateMatchResponse', {personA: this.props.user.facebookId, personB: user.user.facebookId, response: false})
    this.props.reject(this.state.currentUserCard)
  }

  closeModal = () => {
    this.setState({modalMatch: false});
    this.props.meet(this.state.currentUserCard);
  }

  sendMessage = () => {
    this.props.meet(this.state.currentUserCard);
    this.navigateToConvo(this.state.currentUserCard);
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
    let user = this.state.currentUserCard.user;
    return (
      <View>
        {
          this.state.modalMatch ?

          <MatchModal closeModal={this.closeModal} user={this.props.user} currentUserCard={this.state.currentUserCard}/>
          :
          <ScrollView style={{display:'flex', flexDirection: 'column', height: '100%', width: '100%',}} >

            <PersonalPictureSwiper
              photos={user.photos}
            />


            <View style={{flex:1,  flexDirection:'row', alignItems:'center', width: '100%', justifyContent:'space-around', marginTop: 25}}>
              <TouchableOpacity style={styles.meetButtons} onPress={() => this.clickNoOnUser(this.state.currentUserCard)}>
                <Icon color='red' name='clear' size={40}>
                </Icon>
              </TouchableOpacity>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View flexDirection='row'>
                  <Icon name='room' size={17} color='grey' style={{marginTop:6}}></Icon>
                  <Text style={styles.belowCardInfo}> {this.state.currentUserCard.distance} Feet Away</Text>
                </View>
                <View flexDirection='row'>
                  <Icon name='face' size={17} color='grey' style={{marginTop:6}}></Icon>
                  <Text style={styles.belowCardInfo}> {user.peopleMet ? user.peopleMet + ' people met' : 'New User' } </Text>
                </View>
                <Text style={styles.belowCardInfo}>
                  {user.friends.length} mutual friends
                </Text>
                <Text style={styles.belowCardInfo}>
                  Looking for: {user.intention}
                </Text>
              </View>
              <TouchableOpacity style={styles.meetButtons} onPress={() => this.clickYesOnUser(this.state.currentUserCard)}>
                <Icon color='green' name='done' size={40}>
                </Icon>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.bioHeader}>
                <Text style={styles.textHeading}>Bio</Text>
              </View>
              <View>
                <Text style={styles.description}>{user.bio.trim()}</Text>
              </View>

              {user.mainInterests.map(interest => (
                <View key={interest._id} style={{marginTop: 15}}>
                  <View style={styles.header}>
                    <Text style={styles.textHeading}>-- {interest.category} -- {interest.subCategory}:</Text>
                  </View>
                  <Text style={styles.description}>{interest.description.trim()}</Text>
                </View>
              ))}

              <View style={{height:30}}></View>
            </View>
            <View style={{height:30}}></View>

          </ScrollView>
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  card : {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      height: 12,
      width: 2,
    },
  },
  slide: {
    flexDirection: 'row',
    flex: 4,
  },
  description: {
    color: 'rgba(0,0,0,.7)',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  descriptionHeader: {
    fontWeight: '100',
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
    marginLeft: 10,
  },
  picture: {
    flex: 1,
    height: 300,
    borderRadius: 10
  },
  belowCardInfo: {
    fontWeight: '300',
    fontSize: 16,
    color: 'grey',
    paddingTop: 4
  },
  meetButtons: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.3 )',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:80,
    backgroundColor:'#fff',
    borderRadius:40,
  },
  header:{
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  bioHeader:{
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  textHeading: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
