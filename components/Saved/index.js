import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, StyleSheet, View, TextInput, ScrollView, TabBarIOS } from 'react-native';
import { Container, Button, Text, Icon, H1, H2, H3 } from 'native-base';

export default class Saved extends Component {

  // static propTypes = {
  //   index: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   navigator: PropTypes.object.isRequired
  // }

  constructor(props, context) {
    super(props, context);
    this.state = {
      zip: '',
      fadeAnim: new Animated.Value(0),
      selected: false,
    }
    this.updateTabSelection = this.updateTabSelection.bind(this);
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 250,
        delay: 0,
        isInteraction: false,
        useNativeDriver: true
      }
    ).start()
  }

  updateTabSelection() {
    console.log('hello SAVED updateTabSelection!!')
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    let { fadeAnim } = this.state
    return (
      <TabBarIOS.Item
        systemIcon={'favorites'}
        selected={this.state.selected}
        onPress={this.updateTabSelection}
      >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
      >
        <Animated.View style={{flex:1,justifyContent: "center",alignItems: "center",opacity:fadeAnim}}>
          <H1>{this.props.title}</H1>
          {/* Adopt a Pet??? */}
          <H3 style={{marginTop: 10}}>Animal Saved!!!</H3>



          <Text>Powered by Petfinder</Text>
        </Animated.View>
      </ScrollView>
      </TabBarIOS.Item>
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
