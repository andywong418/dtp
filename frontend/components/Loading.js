import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LogoutButton from '../components/LogoutButton';

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View></View>
        <ActivityIndicator size="large" color="#B400FF" />
        <LogoutButton style={{alignSelf: 'flex-end'}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  text: {
    alignSelf: 'center',
  },
});
