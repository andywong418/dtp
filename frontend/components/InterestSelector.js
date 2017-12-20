import React from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// import {Dropdown} from 'react-native-material-dropdown';
import {
  categories,
  subCategories,
} from '../constants/Categories';

export default class InterestSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: this.props.interest.category,
      subCategory: this.props.interest.subCategory,
    }
  }

  handleCategoryChange = (value) => {
    this.setState({category: value})
    this.props.changeInterestState('categorySelected', value)
  }

  handleSubcategoryChange = (value) => {
    this.setState({subCategory: value})
    this.props.changeInterestState('subCategorySelected', value)
  }

  componentDidUpdate = () => {
    console.log('this.props in InterestSelector componentDidUpdate: ', this.props);
  }

  render() {
    let interestName = this.props.interestName;
    interestName = 'I' + interestName.slice(1, 8) + ' ' + interestName.slice(-1);
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.interestHeader}>{interestName}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.category}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.category}
            onValueChange={(itemValue) => this.handleCategoryChange(itemValue)}>
            {categories.map(category => <Picker.Item
              label={category.value}
              value={category.value}
              key={category.value}
            />)}
          </Picker>
          {this.props.interest.categorySelected
          ?
          <Picker
            style={styles.category}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.subCategory}
            onValueChange={(itemValue) => this.handleSubcategoryChange(itemValue)}>
            {subCategories[this.props.interest.categorySelected].map(subCategory => <Picker.Item
              label={subCategory.value}
              value={subCategory.value}
              key={subCategory.value}
            />)}
          </Picker>
          :
          null
          }
        </View>
        {this.props.interest.subCategorySelected
        ?
        <TextInput
          autoGrow={true}
          style={styles.text}
          editable={true}
          maxLength={140}
          multiline={true}
          numOfLines={4}
          onChangeText={(text) => this.props.changeInterestState('description', text)}
        />
        :
        null
        }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    borderColor: '#c6c6c6',
    borderWidth: 1,
  },
  interestHeader: {
    marginLeft: 10,
  },
  itemStyle: {
    fontSize: 15,
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:10,
  },
  text: {
    backgroundColor: 'white',
    borderColor: '#B400FF',
    borderRadius: 2,
    borderWidth: 1,
    height: 60,
    padding: 5,

  }
});
