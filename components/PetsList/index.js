import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { Text } from 'native-base';

import { Loading } from '../Loading';
import { key } from '../../api';
import { PetsListItem } from '../PetsListItem';
import { PetsListItemInfo } from '../PetsListItemInfo';

export default class PetsList extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    navigator: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    console.log('PetsList props: ', props)
    this.state = {
      isLoading: true,
      pets: {
        pet: []
      },
      lastOffset: {
        $t: 0
      },
      err : {
        message: ''
      },
    }
    this.viewMorePetInfo = this.viewMorePetInfo.bind(this);
  }

  componentDidMount() {
    fetch(`http://api.petfinder.com/shelter.getPets?key=${key}&id=${this.props.id}&format=json&offset=0`)
    .then((res) => {
      return res.json()
    }).then((json) => {
      console.log('json: ', json.petfinder)
      let { lastOffset, pets } = json.petfinder
      this.setState({isLoading: false, lastOffset, pets}, () => {
        console.log('PetsList setState :', this.state)
      })

    }).catch((err) => {
      console.log('fetch error: ', err.message)
      this.setState({err, isLoading: false})
    })
  }

  viewMorePetInfo(pet) {
    console.log('hello from viewMorePetInfo', pet)
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: PetsListItemInfo,
      title: pet.name['$t'],
      passProps: {index: nextIndex, pet, getPet: this.props.getPet},
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      )
    }
    if(this.state.pets.pet && Array.from(this.state.pets.pet).length < 2) {
      return (
        <View style={styles.container}>
          <ScrollView bounces={false} style={{flex: 1, marginTop: 100}}>
            <PetsListItem pet={this.state.pets.pet} viewMore={this.viewMorePetInfo} />
          </ScrollView>
        </View>
      )
    }
    if(this.state.pets.pet.length) {
      return (
        <View style={styles.container}>
          <Text>{this.state.err.message}</Text>
          <FlatList style={styles.flatlist}
            bounces={true}
            data={this.state.pets.pet}
            extraData={this.state.pets.pet}
            renderItem={({item}) => <PetsListItem pet={item} viewMore={this.viewMorePetInfo} />}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={true}
            ListHeaderComponent={() => <Text style={{alignSelf: 'center'}}> Current Adoptable Pets </Text>}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center'}}>No Pet Data Currently Available</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF2EB',
    justifyContent: 'center'
  },
  flatlist: {
    flex: 1,
    marginTop: 80,
    backgroundColor: '#DDF2EB',
  },
});
