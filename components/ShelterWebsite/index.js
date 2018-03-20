import React, { Component } from 'react';
import { StyleSheet, WebView, View } from 'react-native';

import { Loading } from '../Loading';

export const ShelterWebsite = (props) => (
  <View style={styles.container}>
    <WebView
      source={{uri: `https://awos.petfinder.com/shelters/${props.id}.html`}}
      style={styles.container}
      renderLoading={() => <Loading />}
      startInLoadingState={true}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
