/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  BackHandler,
  TouchableOpacity,
  Image,
  Easing,
  View
} from 'react-native';

var Sound = require('react-native-sound');
var randomMC = require('random-material-color');

var whoosh = new Sound('casino_game.mp3', Sound.MAIN_BUNDLE, (error) => {
if (error) {
console.log('failed to load the sound', error);
return;
}
// loaded successfully
console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});

var won = new Sound('won.mp3', Sound.MAIN_BUNDLE, (error) => {
if (error) {
console.log('failed to load the sound', error);
return;
}
// loaded successfully
console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});

var lose = new Sound('lose.mp3', Sound.MAIN_BUNDLE, (error) => {
if (error) {
console.log('failed to load the sound', error);
return;
}
// loaded successfully
console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});

const firstSet  = [ require('../assets/messi.jpg'), require('../assets/panda.jpg'), require('../assets/anjeli.jpg')];
const secondSet  = [ require('../assets/panda.jpg'), require('../assets/messi.jpg'), require('../assets/anjeli.jpg')];
const thirdSet  = [ require('../assets/anjeli.jpg'), require('../assets/panda.jpg'), require('../assets/messi.jpg')];


let randomHex = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

export default class SlotMachine extends Component<{}> {

  static navigationOptions = {
    header: null,
  };

  constructor () {
  super()
  this.spinValue = new Animated.Value(0);
  this.state = {
    stopSpin: false,
    spin1: false,
    image1: '',
    image2: '',
    image3: '',
    backgroundColor: randomMC.getColor(),
    mainColor: 'white',
    buttonColor: 'green',
    won: false,
  };
 }



 componentDidMount() {
   BackHandler.addEventListener('hardwareBackPress', function() {
      this.stopSound();
   }.bind(this));
 }


  spin () {
    let color = randomMC.getColor();
    let mainColor = randomMC.getColor();
    this.setState({ spin1: true, won: false, stopSpin: false, backgroundColor: randomMC.getColor(), buttonColor:randomMC.getColor(),  mainColor: mainColor });
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 670,
        easing: Easing.linear
      }
    ).start( () => {
    if(this.state.stopSpin === false) {
      this.spin();
      whoosh.play();
    }
  });
  }



  stop() {
    whoosh.pause();
    const item1 = firstSet[Math.floor(Math.random()*firstSet.length)];
    const item2 = secondSet[Math.floor(Math.random()*secondSet.length)];
    const item3 = thirdSet[Math.floor(Math.random()*thirdSet.length)];
    console.log("item1", "item2", "item3", item1, item2, item3);
    this.setState({image1: item1, image2: item2, image3: item3, stopSpin: true, spin1: false  });
    if((item1==item2) && (item2==item3) && (item1==item3)){
      won.play();
      this.setState({ won: true });
    } else {
      lose.play();
      this.setState({ won: false });
    }
  }

  stopSound() {
    whoosh.pause();
    this.setState({ stopSpin: true, spin1: false  });
  }

  render() {
    console.log("the maincolor is----->", this.state.mainColor);
    const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
   })
    return (
      <View style={[styles.container, { backgroundColor: this.state.mainColor }]}>
        <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', backgroundColor: this.state.backgroundColor }}>
          {
            this.state.stopSpin ?

            <Image
            resizeMode = "cover"
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              }}
              source={this.state.image1}
            />
            :
            <Animated.Image
            resizeMode = "contain"
            style={{
              width: 100,
              height: 100,
              transform: [{rotate: spin}] }}
              source={require('../assets/wheel.png')}
            />
          }
          {
            this.state.stopSpin ?

            <Image
            resizeMode = "cover"
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginRight: 5,
              marginLeft: 5,
              }}
              source={this.state.image2}
            />
            :

            <Animated.Image
            resizeMode = "contain"
            style={{
              width: 100,
              height: 100,
              transform: [{rotate: spin}] }}
              source={require('../assets/wheel.png')}
            />
          }
          {
            this.state.stopSpin ?

            <Image
            resizeMode = "cover"
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              }}
              source={this.state.image3}
            />
            :

            <Animated.Image
            resizeMode = "contain"
            style={{
              width: 100,
              height: 100,
              transform: [{rotate: spin}] }}
              source={require('../assets/wheel.png')}
             />

          }
        </View>
        <View style={{flex: 0.2 }}>
         <TouchableOpacity style={{ padding: 20, backgroundColor: this.state.buttonColor  }} onPress={()=>{this.state.spin1 ? this.stop() : this.spin()}}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>{this.state.spin1 ? "STOP SPIN": "START SPIN"}</Text>
         </TouchableOpacity>
        </View>
        <View style={{ flex: 0.3 }}>
         {
           this.state.won
           ?
           <Image
           style={{
             width: null,
             flex: 1,
             height: null,
             }}
             source={require('../assets/winner.gif')}
           />
           :

           <Image
           resizeMode = "cover"
           style={this.state.image1 && !this.state.spin1 ? styles.lost: styles.hideLost}
             source={require('../assets/loser.gif')}
           />
         }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  lost: {
    width: null,
    height: null,
    flex: 1,
  },
  hideLost: {
    height: 0,
    width: 0,
  }
});
