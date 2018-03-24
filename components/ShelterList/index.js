import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, StyleSheet, View, FlatList } from 'react-native';
import { Button, Text, SwipeRow, Icon } from 'native-base';

import { Loading } from '../Loading';
import { ShelterListItem } from '../ShelterListItem';
import { ShelterWebsite } from '../ShelterWebsite';
import { key } from '../../api';
import PetsList from '../PetsList';

export default class ShelterList extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    navigator: PropTypes.object.isRequired,
    zip: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    console.log('ShelterList props: ', props)
    this.state = {
      isLoading: true,
      isError: false,
      shelters: [],
      lastOffset: {
        $t: 0
      },
      err: {
        message: ''
      },
      fadeAnim: new Animated.Value(0),
    }
    this.viewShelterWebsite = this.viewShelterWebsite.bind(this);
    this.viewShelterPets = this.viewShelterPets.bind(this);
    this.loadMoreShelters = this.loadMoreShelters.bind(this);
  }

  componentDidMount() {
    fetch(`http://api.petfinder.com/shelter.find?key=${key}&location=${this.props.zip}&format=json&offset=0`)
    .then((res) => {
      return res.json()
    }).then((json) => {
      let { lastOffset } = json.petfinder
      let shelters = json.petfinder.shelters.shelter
      this.setState({isLoading: false, shelters, lastOffset}, () => {
        // Animates list items opacity
        Animated.timing(                  // Animate over time
          this.state.fadeAnim,            // The animated value to drive
          {
            toValue: 1,                   // Animate to opacity: 1 (opaque)
            duration: 500,
            delay: 100,
            isInteraction: false,
            useNativeDriver: true
          }
        ).start()
      })
    }).catch((err) => {
      console.log('ShelterList fetch error: ', err)
      this.setState({err, isLoading: false, isError: true})
    })
  }

  viewShelterWebsite(id, name) {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: ShelterWebsite,
      title: name,
      passProps: {index: nextIndex, id},
    });
  }

  viewShelterPets(id, name) {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: PetsList,
      title: name,
      passProps: {index: nextIndex, id, getPet: this.props.getPet},
    });
  }

  loadMoreShelters() {
    let offset = this.state.lastOffset['$t']
    fetch(`http://api.petfinder.com/shelter.find?key=${key}&location=${this.props.zip}&format=json&offset=${offset}`)
    .then((res) => {
      return res.json()
    }).then((json) => {
      let { lastOffset } = json.petfinder
      let additionalShelters = json.petfinder.shelters.shelter
      let shelters = this.state.shelters.slice()
      additionalShelters.forEach((item) => {
        // console.log('additionalShelters item: ', item)
        shelters.push(item)
      })
      this.setState({lastOffset, shelters}, () => {
        console.log('setState loadMoreShelters: ', this.state)
      })
    }).catch((err) => {
      this.setState({err, isLoading: false, isError: true})
    })
  }

  render() {
    let { fadeAnim } = this.state
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      )
    }
    if(this.state.isError) {
      return (
        <View style={styles.container}>
          <Text style={{alignSelf: 'center'}}>{this.state.err.message}</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList style={styles.flatlist}
          bounces={true}
          data={this.state.shelters}
          extraData={this.state.shelters}
          renderItem={({item}) => <Animated.View style={{opacity: fadeAnim}}>
                                  <SwipeRow
                                    leftOpenValue={75}
                                    rightOpenValue={-75}
                                    style={{flex:1, backgroundColor:'#DDF2EB'}}
                                    left={
                                      <Button
                                        success
                                        onPress={() => this.viewShelterPets(item.id['$t'], item.name['$t'])}
                                      >
                                        <Icon active name="md-paw" />
                                      </Button>
                                    }
                                    body={
                                      <ShelterListItem
                                        shelter={item}
                                        viewWebsite={this.viewShelterWebsite}
                                        viewPets={this.viewShelterPets}
                                      />
                                    }
                                    right={
                                      <Button
                                        primary
                                        onPress={() => this.viewShelterWebsite(item.id['$t'], item.name['$t'])}
                                      >
                                        <Icon active name="md-globe" />
                                      </Button>
                                    }
                                  />
                                </Animated.View>}
          keyExtractor={(item, index) => item.id['$t']}
          showsVerticalScrollIndicator={true}
          // ListHeaderComponent={(item) => <Text style={{alignSelf: 'center'}}> Scrolling Petfinder Shelters </Text>}
          ListFooterComponent={() => (this.state.lastOffset['$t'] < 100 &&
                                      <Button
                                        full rounded
                                        onPress={this.loadMoreShelters}
                                        accessibilityLabel="Load More Shelters"
                                        style={{backgroundColor: 'white', alignSelf: 'stretch', margin: 10, borderColor: 'black', borderWidth: 1}}
                                      >
                                        <Text style={{color:'#59A96A'}}>Load More Shelters</Text>
                                      </Button>)
                                      }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF2EB',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    marginTop: 80,
    backgroundColor: '#DDF2EB',
    flexDirection:'column',
  },
});
