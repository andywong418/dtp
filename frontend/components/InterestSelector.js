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
  componentDidUpdate = () => {
    console.log('\n\n\nvvv componentDidUpdate vvv\n\n\n');
    console.log('\n\nthis.state in InterestSelector componentDidUpdate: ', this.state);
    console.log('\n\n\n^^^ componentDidUpdate ^^^\n\n\n');
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
            style={styles.category}
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
