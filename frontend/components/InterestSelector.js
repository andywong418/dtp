import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
  categories,
  subCategories,
} from '../constants/Categories';


export default class InterestSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let interestName = this.props.interestName;
    interestName = 'I' + interestName.slice(1, 8) + ' ' + interestName.slice(-1);
    return (
      <View style={{marginTop: 20, paddingLeft: 15}}>
        <Text>{interestName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Dropdown
            onChangeText={(value, index, data) => this.props.changeInterestState('categorySelected', value)}
            containerStyle={{flex: 1, paddingTop: 0}}
            data={categories}
            label="Main Categories"
            itemCount={6}
            value = {this.props.interest.categorySelected ? this.props.interest.categorySelected : ''}
          />
          {this.props.interest.categorySelected
            ?
            <Dropdown
              onChangeText={(value, index, data) => this.props.changeInterestState('subCategorySelected', value)}
              containerStyle={{flex: 1, marginLeft: 5}}
              data={subCategories[this.props.interest.categorySelected]}
              label="Sub Categories"
              itemCount={6}
              value = {this.props.interest.subCategorySelected ? this.props.interest.subCategorySelected : ''}
            />
            :
            null
          }
        </View>
        {this.props.interest.subCategorySelected
          ?
          <TextInput
            style={{backgroundColor: 'white'}}
            editable={true}
            maxLength={140}
            multiline={true}
            numOfLines={3}
            onChangeText={(text) => this.props.changeInterestState('value', text)}
          />
          :
          null
        }
      </View>
    )
  }
}
