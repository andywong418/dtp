import React from 'react';
import {
  Body,
  ListItem,
} from 'native-base';
import {
  Button,
  StyleSheet,
} from 'react-native';

export default class SaveSettingsButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ListItem style={{marginLeft: 0,}}>
        <Body>
          <Button
            title='Save'
            onPress={() => this.props.handleSave()}
            color="#B400FF"
            style={styles.button}
          />
        </Body>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-end',
    marginTop: 5,
    paddingTop: 5,
  },
});
