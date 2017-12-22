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
      categorySelected: props.interest.categorySelected,
      subCategorySelected: props.interest.subCategorySelected,
    }
  }

  handleCategoryChange = (value) => {
    this.setState({categorySelected: value})
    this.props.changeInterestState('categorySelected', value)
  }

  handleSubcategoryChange = (value) => {
    this.setState({subCategorySelected: value})
    this.props.changeInterestState('subCategorySelected', value)
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
      categorySelected: newProps.interest.categorySelected,
      subCategorySelected: newProps.interest.subCategorySelected,
    })
  }

  render() {
    let interestName = this.props.interestName;
    interestName = 'I' + interestName.slice(1, 8) + ' ' + interestName.slice(-1);
    return (
      <View style={styles.selectorContainer}>
        <View style={styles.header}>
          <Text style={styles.interestHeader}>{interestName}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={this.props.interest.categorySelected ? styles.pickerLeft : styles.picker}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.categorySelected}
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
            style={styles.pickerRight}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.subCategorySelected}
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
          value={this.props.interest.description}
          autoGrow={true}
          style={styles.text}
          editable={true}
          maxLength={140}
          multiline={true}
          numOfLines={4}
          placeholder={'Describe your interest'}
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
  picker: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    marginBottom: 1,
    marginRight: 1,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  pickerRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flex: 1,
    marginBottom: 1,
    marginLeft: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  interestHeader: {
    marginBottom:2,
    alignSelf: 'center',
  },
  itemStyle: {
    fontSize: 15,
    height: 120,
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:10,
    marginBottom:20,
  },
  text: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 60,
    padding: 5,
    marginTop:5,
    marginLeft: 10,
    marginRight: 10,
  },
  header:{
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
});
