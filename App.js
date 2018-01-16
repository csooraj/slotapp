/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import {
   StackNavigator,
 } from 'react-navigation';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SlotMachine from './src/components/SlotMachine.js';
import RotatingMachine from './src/components/RotatingEffect.js'
import HomeScreen from './src/components/Home.js'
import Tester from './src/components/tester.js'
import Tour from './src/components/apptour.js';

const App = StackNavigator({
  Home: { screen: RotatingMachine },
  SlotMachine: { screen: SlotMachine },
});

export default App;
