import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Container, Button, Text, Icon, H1, H2, H3 } from 'native-base';

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
      zip: '',
      fadeAnim: new Animated.Value(0),
    }
    this.viewShelters = this.viewShelters.bind(this);
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 500,
        delay: 0,
        isInteraction: false,
        useNativeDriver: true
      }
    ).start()
  }

  getPet(pet) {
    console.log('hello from Home getPet: ', pet)
  }

  viewShelters() {
    let { zip } = this.state
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: ShelterList,
      title: 'Shelters',
      passProps: {index: nextIndex, zip, getPet: this.getPet},
    });
  }

  render() {
    let { fadeAnim } = this.state
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
      >
        <Animated.View style={{flex:1,justifyContent: "center",alignItems: "center",opacity:fadeAnim}}>
          <H1>{this.props.title}</H1>
          {/* Adopt a Pet??? */}
          <H3 style={{marginTop: 10}}>Animal Shelter Search</H3>
          <Text style={{marginTop: 10}}>Enter 5 digit ZIP Code:</Text>
          <TextInput
            style={{alignSelf: 'stretch', margin: 10, height: 40, borderColor: 'black', borderWidth: 1}}
            onChangeText={(zip) => this.setState({zip})}
            value={this.state.text}
            placeholder={'Enter 5 digit ZIP Code'}
            maxLength={5}
            keyboardType={'number-pad'}
            clearButtonMode={"while-editing"}
          />
          <Button
            full rounded iconRight
            onPress={this.viewShelters}
            accessibilityLabel="Search Petfinder Shelters"
            style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, }}
          >
            <Text>Search</Text>
            <Icon name="md-paw" />
          </Button>
          <Text>Powered by Petfinder</Text>
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop: 50,
  },
});
