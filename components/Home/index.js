import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Button, Text } from 'native-base';

import ShelterList from '../ShelterList';

export default class Home extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: ''
    }
    this.viewShelters = this.viewShelters.bind(this);
  }

  getPet(pet) {
    console.log('hello from Home getPet: ', pet)
  }

  viewShelters() {
    let { text } = this.state
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: ShelterList,
      title: 'Shelters',
      passProps: {index: nextIndex, text, getPet: this.getPet},
    });
  }

  render() {

    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
      >
        {/* <Text>Home Screen Component! { this.props.title }</Text> */}
      <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Text>Enter 5 digit ZIP Code</Text>
        <TextInput
          style={{alignSelf: 'stretch', margin: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={'Enter 5 digit ZIP Code'}
          maxLength={5}
          keyboardType={'number-pad'}
          clearButtonMode={"while-editing"}
          // onEndEditing={() => this.viewShelters()}
        />

        <Button
          full rounded
          onPress={this.viewShelters}
          accessibilityLabel="Search Petfinder Shelters"
          style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, borderColor: 'gray', borderWidth: 1}}
        >
          <Text>Search</Text>
        </Button>
        <Text style={{}}>Powered by Petfinder</Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop: 100,
  },
});
