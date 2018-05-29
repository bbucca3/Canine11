import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';

export const ShelterListItem = (props) => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Text style={styles.text}>
        {props.shelter.name['$t']}
      </Text>
      <Text style={styles.text}>
        {props.shelter.city['$t'] + ", "}
        {props.shelter.state['$t'] + " "}
        {props.shelter.zip['$t']}
      </Text>
      <Text></Text>
      <Button
        full rounded
        onPress={() => props.viewPets(props.shelter.id['$t'], props.shelter.name['$t'])}
        accessibilityLabel="View Adoptable Pets"
        style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, borderColor: 'gray', borderWidth: 1}}
      >
        <Text>View Adoptable Pets</Text>
        <Icon name="md-paw" />
      </Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF2EB',
    alignItems: 'stretch'
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDF2EB',
    marginLeft: 15,
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center',
    marginTop: 10
  }
});
