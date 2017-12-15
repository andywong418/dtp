import React from 'react';
import {
  Button,
} from 'react-native';

export default class SaveSettingsButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Button
        title='Save'
        onPress={() => this.props.handleSave()}
        color='white'
      />
    )
  }
}
