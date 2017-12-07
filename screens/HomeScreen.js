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
} from 'react-native';
import { connect } from 'react-redux';
import { callLogout } from '../actions/index';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button
            title="Logout"
            onPress={() => this._handleLogout()}
          />
        </ScrollView>
      </View>
    );
  }

  _handleLogout = async () => {
    try {
      console.log('\n\nheading into logout\n\n');
      await AsyncStorage.removeItem('user')
      this.props.callLogout();
      let user = AsyncStorage.getItem('user')
      user = JSON.parse(user);
      console.log('user in HomeScrren _handleLogout: ', user);
      console.log('props in HomeScrren _handleLogout: ',this.props.login.name, this.props.login.id);
    }
    catch (e) {
      console.log('logoutError: ', e);
    }
  };

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

const mapStateToProps = (state) => ({
  login: state.login
});

const mapDispatchToProps = (dispatch) => ({
  callLogout: () => dispatch(callLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
