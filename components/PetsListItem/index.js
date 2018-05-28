import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'native-base';

export const PetsListItem = (props) => (
  <View style={styles.container}>
    <View style={styles.item}>
      {!props.pet.media.photos && <Text>No Photos Currently Available</Text>}

      {props.pet.media.photos &&
        <Image
          style={{width: 75, height: 100, margin: 1, borderRadius: 5}}
          source={{uri: props.pet.media.photos.photo.find((item) => item['@size'] === 'x')['$t']}}
          resizeMode={Image.resizeMode.cover}
        />
      }
      <Text style={styles.text}>
        {"Name: " + props.pet.name['$t']}
      </Text>
      <Text style={styles.text}>
        {"Animal: " + props.pet.animal['$t']}
      </Text>
      <Text style={styles.text}>
        {"Age: " + props.pet.age['$t']}
      </Text>
      <Button
        full rounded
        onPress={() => props.viewMore(props.pet)}
        accessibilityLabel="View More Pet Information"
        style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, borderColor: 'gray', borderWidth: 1}}
      >
        <Text>View More Info</Text>
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
    margin: 15,
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center'
  }
});
