import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class FullWidthImage extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    //console.log("CONTAINER WIDTH", event.nativeEvent);
    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      });
    } else {
      Image.getSize(this.props.source, (width, height) => {
        this.setState({
          width: containerWidth,
          height: containerWidth * height / width
        });
      });
    }
  }

  render() {
    //console.log(this.props.source, this.state.width, this.state.height);
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height
          }}
        />
      </View>
    );
  }
}
