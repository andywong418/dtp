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
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'



const MatchModal = (props) => {
  console.log("PROPS", props);
  return(
    <View style={{backgroundColor: '#B400FF',height: '100%', justifyContent: 'center', alignItems:'center'}}>
      <TouchableOpacity onPress={() => props.closeModal()} style={{position: 'absolute', top: 10, right:10}}><FontAwesomeIcons name='times' color="white" size={30}></FontAwesomeIcons></TouchableOpacity>
      <Text style={{color: 'white', fontSize: 40, marginBottom: 40}}> Let's meet! <FontAwesomeIcons name='smile-o' color="#FABE58" size={40}> </FontAwesomeIcons></Text>

      <View style={{flexDirection: 'row', justifyContent:'space-between', width: '60%', marginBottom: 40}}>
        <Image
          source={
            props.user.photos[0].url
            ? {uri: props.user.photos[0].url}
            : require('../assets/images/icon.png')
          }
          style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:100,
            height:100,
            borderRadius:50,
          }}
        />
          <Image
            source={
              props.currentUserCard.user.photos[0].url
              ? {uri: props.currentUserCard.user.photos[0].url}
              : require('../assets/images/icon.png')
            }
            style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:100,
              height:100,
              borderRadius:50,
            }}
          />
      </View>
      <View style={{marginTop: 50}}>
        <TouchableOpacity style={{padding: 15, borderColor: 'white', borderWidth: 1}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Send Message</Text></TouchableOpacity>
        <TouchableOpacity style={{padding: 15, backgroundColor: '#f45368', marginTop: 20}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center' }}>Create Plan</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default MatchModal;
