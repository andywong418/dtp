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
        <ActivityIndicator size="large" color="#B400FF" />
        <Text style={styles.text}>Loading</Text>
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
  },
  text: {
    alignSelf: 'center',
  },
});
