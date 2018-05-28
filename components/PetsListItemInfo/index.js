import React, { Component } from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Button, Text } from 'native-base';

export const PetsListItemInfo = (props) => (
  <View style={styles.container}>
    <View style={styles.item}>
      {props.pet.media.photos &&
        <FlatList style={{flex: 1, flexDirection: 'column'}}
          data={props.pet.media.photos.photo}
          renderItem={({item}) => {
            if(item['@size'] === 'x') {
              return(
                <Image
                  style={{alignSelf: 'center', width: 250, height: 250, margin: 0.5, borderRadius: 5}}
                  source={{uri: item['$t']}}
                  resizeMode={Image.resizeMode.cover}
                />
              )
            }
          }}
          keyExtractor={(item, index) => String(index)}
          ListHeaderComponent={() => <Text style={styles.textHeader}>Photos of {props.pet.name['$t']}</Text>}
          ListFooterComponent={() => <Text style={styles.textFooter}>
            {props.pet.description['$t'] && props.pet.description['$t'].replace(/<\/?[^>]+(>|$)/g, "").replace('Â', '')}
          </Text>}
        />
      }
      {!props.pet.media.photos && <Text style={styles.text}>No Photos Currently Available</Text>}
      {props.pet.breeds.breed && Array.from(props.pet.breeds.breed).length < 2 &&
        <Text style={styles.text}>
          {"Breed: " + props.pet.breeds.breed['$t']}
        </Text>
      }

      {Array.from(props.pet.breeds.breed).length >= 2 &&
        <Text style={styles.text}>
        {"Breed(s):" +
          Array.from(props.pet.breeds.breed).map((breed, index) => {
            return " " + breed['$t']
          })
        }
        </Text>
      }
      <Button
        full rounded
        onPress={() => console.log('hello View Shelter')}
        accessibilityLabel="View Shelter"
        style={{backgroundColor: '#59A96A', alignSelf: 'stretch', margin: 10, borderColor: 'gray', borderWidth: 1}}
      >
        <Text>View Shelter</Text>
      </Button>
      {/* <TouchableOpacity
        onPress={() => props.getPet(props.pet)}
      >
        <Text style={{color: '#59A96A'}}> GET PET! </Text>
      </TouchableOpacity> */}
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
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#DDF2EB',
    margin: 15,
    alignItems: 'center'
  },
  text: {
    alignSelf: 'center',
    marginTop: 10
  },
  textHeader: {
    alignSelf: 'center',
  },
  textFooter: {
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});
