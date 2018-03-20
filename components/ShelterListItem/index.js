import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';

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
      {/* <TouchableOpacity
        onPress={() => props.viewPets(props.shelter.id['$t'], props.shelter.name['$t'])}
      >
        <Text style={{color: '#59A96A'}}> View Adoptable Pets {"\n"}</Text>
      </TouchableOpacity> */}
      <Button
        full rounded
        onPress={() => props.viewPets(props.shelter.id['$t'], props.shelter.name['$t'])}
        accessibilityLabel="View Adoptable Pets"
        style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, borderColor: 'gray', borderWidth: 1}}
      >
        <Text>View Adoptable Pets</Text>
      </Button>
      {/* Loads shelter page on petfinder

        <TouchableOpacity
        onPress={() => props.viewWebsite(props.shelter.id['$t'], props.shelter.name['$t'])}
      >
        <Text style={{color: '#59A96A'}}> View Petfinder Webpage </Text>
      </TouchableOpacity> */}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BDEAC',
    alignItems: 'stretch'
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center',
    marginTop: 10
  }
});
