'use strict';

import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import Home from './components/Home';

export default class App extends Component<Props> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'Home',
          passProps: {index: 1, title: "Cool props!!!"},
        }}
        style={{flex: 1}}
      />
    );
  }
}
