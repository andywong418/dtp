import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Picture from '../components/Picture';
import Swiper from 'react-native-swiper';

export default class PersonalPictureSwiper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      {
        this.props.photos
        ?
        <Swiper height={300}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination} loop>
          {this.props.photos.map(photo => { return (
              <View
                style={styles.slide}
                key={photo.url}
              >
                <Picture
                imageUri={photo.url}
                date={photo.date}
                />
              </View>
            )}
          )}
        </Swiper>
        :
        <Swiper height={300}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination} loop>
          <View
            style={styles.slide}
            title={<Text numberOfLines={1}>Put your pictures here!</Text>}
          >
            <Picture key={1}/>
          </View>
          <View
            style={styles.slide}
            title={<Text numberOfLines={1}>More people will match with you if you have more pictures</Text>}
          >
            <Picture key={2}/>
          </View>
          <View
            style={styles.slide}
            title={<Text numberOfLines={1}>Add from Facebook or your phone</Text>}
          >
            <Picture key={3}/>
          </View>
        </Swiper>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#B400FF',
    borderRadius: 4,
    height: 8,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    width: 8,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 4,
    height: 5,
    marginBottom: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    width: 5,
  },
  pagination: {
    bottom: -23,
    left: null,
    right: 10,
  },
  slide: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
});
