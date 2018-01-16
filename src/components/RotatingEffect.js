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
  ImageBackground,
  TouchableOpacity,
  Image,
  Easing,
  View
} from 'react-native';

import { Dimensions } from 'react-native'

var Sound = require('react-native-sound');
var randomMC = require('random-material-color');
import AnimatedOverlay from 'react-native-animated-overlay';
import * as Animatable from 'react-native-animatable';

let count = 0;

const {width, height} = Dimensions.get('window')

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

const firstSet  = [ require('../assets/messi.jpg'), require('../assets/lion.jpg'), require('../assets/anjeli.jpg')];
const secondSet  = [ require('../assets/lion.jpg'), require('../assets/messi.jpg'), require('../assets/anjeli.jpg')];
const thirdSet  = [ require('../assets/anjeli.jpg'), require('../assets/lion.jpg'), require('../assets/messi.jpg')];

let timer1 = '';


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
    coin: 20,
    duration: 1000,
    currentSpin: false,
    disabled:  false,
    item1: '🍉',
    item2: '🍉',
    item3: '🍉',
    backgroundColor: randomMC.getColor(),
    mainColor: 'white',
    buttonColor: 'green',
    won: false,
    startSpin1: false,
    startSpin2: false,
    showTour: true,
  };
 }

 componentDidMount() {
   Animated.timing(
     this.spinValue,
     {
       toValue: 1,
       duration: 3000,
       easing: Easing.back
     }
   ).start( () => {});
 }

 stopSound() {
   whoosh.pause();
   this.setState({ stopSpin: true, spin1: false  });
 }


  spin () {
    let color = randomMC.getColor();
    let mainColor = randomMC.getColor();
    let firstSet = [ '🍉', '🍎', '🍇', '🍒', '🍓', '🌶', '🍐', '🍌', '🍋'];
    let secondSet = ['🍒', '🍓', '🌶', '🍐', '🍌', '🍋' ,'🍉', '🍎', '🍇', ];
    let thirdSet = ['🍐', '🍌', '🍋','🍉', '🍎', '🍇', '🍒', '🍓', '🌶'];

    if(count >= 8){
      count = 0;
    }else{
      count = count + 1;
    }
    const item1 = firstSet[count];
    const item2 = secondSet[count];
    const item3 = thirdSet[count];
    console.log("item1", "item2", "item3", item1, item2, item3);
    this.setState({ spin1: true, won: false, item1: item1, stopSpin: false, currentSpin: false, backgroundColor: randomMC.getColor(), buttonColor:randomMC.getColor(),  mainColor: randomMC.getColor() });
    if(this.state.startSpin1){
      this.setState({ item2: item2 });
    }
    if(this.state.startSpin2){
      this.setState({ item3: item3 });
    }
    this.spinValue.setValue(0);
    setTimeout(this.startSecond.bind(this), 1500);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: this.state.duration,
        easing: Easing.in
      }
    ).start( () => {
    if(this.state.stopSpin === false) {
      if(this.state.duration <= 0) {
        this.setState({ duration: 300 });
      }else{
        this.setState({ duration: 600 });
      }
      this.spin();
      //whoosh.play();
    }else{
       this.spinValue.stopAnimation();
    }
  });
  }

  slotSpinner() {
    this.spin();
    //setTimeout(this.stop.bind(this), 20000);
  }



  stop() {
    this.spinValue.stopAnimation();
    this.setState({ stopSpin: true, disabled: true });
    //this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.in
      }
    ).start( () => {
    if(this.state.currentSpin === false) {
      setTimeout(this.currentStopper.bind(this), 200);
      this.stop();
      //whoosh.play();
    }});
    // whoosh.pause();
    // const item1 = firstSet[Math.floor(Math.random()*firstSet.length)];
    // const item2 = secondSet[Math.floor(Math.random()*secondSet.length)];
    // const item3 = thirdSet[Math.floor(Math.random()*thirdSet.length)];
    // console.log("item1", "item2", "item3", item1, item2, item3);
    // this.setState({image1: item1, image2: item2, image3: item3, stopSpin: true, spin1: false  });
    // if((item1==item2) && (item2==item3) && (item1==item3)){
    //   won.play();
    //   this.setState({ won: true });
    // } else {
    //   lose.play();
    //   this.setState({ won: false });
    // }
  }

  currentStopper() {
    let coin = this.state.coin - 5;
    this.setState({ coin: coin });
    console.log("The current Stopper Called", this.state.coin);
    this.setState({ currentSpin: true});
    this.checkResult();
    clearInterval(timer1);
  }

  checkResult() {
    if((this.state.item1 === this.state.item2) && (this.state.item2 === this.state.item3) && (this.state.item3 === this.state.item1)){
      this.setState({ win: true});
      setTimeout(this.openOverlay.bind(this), 1000);
    }else{
      this.setState({ win: false });
      setTimeout(this.openOverlay.bind(this), 1000);
    }
  }


 closeTour(){
   this.setState({ showTour: false });
 }

 openTour(){
   this.setState({ showTour: true });
 }

  closeOverlay() {
    this.setState({ disabled: false });
    this.setState({overlayShow: false, spin: false, spin1: false, duration: 3000, startSpin1: false, startSpin2: false});
  }

  openOverlay() {
    if(this.state.win){
      won.play();
      this.setState({coin: this.state.coin + 20 });
    }
    this.setState({overlayShow: true })
  }

  checkCoin() {
    this.setState({ coin: this.state.coin + 20 , overlayShow: false, spin: false, spin1: false, disabled: false });
  }

  test() {

  }

  startSecond() {
    this.setState({ startSpin1: true });
    setTimeout(this.startThird.bind(this), 2000);
  }

  startThird() {
    this.setState({ startSpin2: true });
  }

  render() {
    const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
   })

   const introButton11= this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 200]
  })

  const introButton22 = this.spinValue.interpolate({
   inputRange: [0, 1],
   outputRange: [ -100, 200]
 })

 const introButton33 = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [-150, 200]
})

  const introButton2 = this.spinValue.interpolate({
   inputRange: [0, 1],
   outputRange: [ -170, 0]
 })

 const introButton1 = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [ -170, 0]
})

 const introButton3 = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: [-120, 0]
})

const introButton4 = this.spinValue.interpolate({
 inputRange: [0, 1],
 outputRange: [-180, 0]
})

    return (
      <ImageBackground source={require('../assets/bg.jpg')} style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ height: 150, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', backgroundColor: 'transparent' }}>
          {
            this.state.stopSpin ?
            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              borderColor: 'white',
              justifyContent: 'center',
              backgroundColor: 'black',
              marginRight: 5,
              borderWidth: 1,
            }}
            >
             <Animated.Text style={{ fontSize: 50,   top: introButton1  }}>
             {this.state.item1}
             </Animated.Text>
            </View>

            :
            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'white',
              backgroundColor: 'black',
              marginRight: 5,
              borderWidth: 1,
               }}
            >
             <Animated.Text style={{ fontSize: 50, top: introButton11}}>
             {this.state.item1}
             </Animated.Text>
            </View>
          }
          {
            this.state.stopSpin  ?

            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'white',
              backgroundColor: 'black',
              borderWidth: 1,
               }}
            >
             <Animated.Text style={{ fontSize: 50, top: introButton3 }}>
             {this.state.item2}
             </Animated.Text>
            </View>
            :
            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              borderColor: 'white',
              borderWidth: 1,
               }}
            >
             <Animated.Text style={{ fontSize: 50, top: this.state.startSpin1 ? introButton22 : this.spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0]
            }) }}>
             {this.state.item2}
             </Animated.Text>
            </View>
          }
          {
            this.state.stopSpin  ?

            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              backgroundColor: 'black',
              borderColor: 'white',
              marginLeft: 5,
              borderWidth: 1,
               }}
            >
             <Animated.Text style={{ fontSize: 50, top: introButton4 }}>
             {this.state.item3}
             </Animated.Text>
            </View>
            :
            <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'white',
              backgroundColor: 'black',
              marginLeft: 5,
              borderWidth: 1,
               }}
            >
             <Animated.Text style={{ fontSize: 50, top: this.state.startSpin2 ?  introButton33 : this.spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0]
            })}}>
             {this.state.item3}
             </Animated.Text>
            </View>
          }
        </View>
        <View style={{flex: 0.2, marginTop: 20, padding: 10}}>
         <TouchableOpacity disabled={this.state.disabled} style={{ padding: 20, backgroundColor: this.state.disabled ? '#283593' : 'black' }} onPress={()=>{this.state.spin1 ? this.stop() : this.slotSpinner()}}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>{this.state.spin1 ? "STOP SPIN": "START SPIN"}</Text>
         </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          <Text style={{  color: '#FFEB3B', fontSize: 20, fontWeight: 'bold' }}>{this.state.coin+'€'}</Text>
        </TouchableOpacity>
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
        <AnimatedOverlay
          onPress={this.state.coin!==0 ? () => this.closeOverlay() : () => this.test()}
          style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}
          backgroundColor='#000'
          opacity={0.8}
          duration={500}
          overlayShow={this.state.overlayShow}
        >
        <Image resizeMode="contain" source={ this.state.win ? require('../assets/rich.jpg') :  require('../assets/dino.gif')} style={{ height: 200, width: 200}} />
        <TouchableOpacity style={{ padding: 20, backgroundColor: '#283593' }} onPress={this.state.coin!==0 ? () => this.closeOverlay() : () => this.test()}>
        <Image resizeMode="contain" style={{ height: 100, width: 300 }} source={ this.state.win ? require('../assets/wonl.jpg') : require('../assets/sy.jpg') } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.checkCoin()} style={this.state.coin===0? styles.showRefill : styles.hideRefill}>
          <Text style={{  color: '#F44336', fontSize: 20, fontWeight: 'bold' }}>Your Credits Expired!!! <Text style={{  color: '#43A047', fontSize: 20, fontWeight: 'bold' }}> Buy Credits</Text></Text>
        </TouchableOpacity>
        </AnimatedOverlay>
        <AnimatedOverlay
          backgroundColor='#000'
          opacity={0.7}
          style={{ flex: 1 }}
          duration={200}
          overlayShow={this.state.showTour}
        >
        <View ref="view" style={{ backgroundColor: 'transparent', flex: 0.55, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>Press here to spin the slot</Text>
          <Animatable.Image animation="slideInDown" iterationCount="infinite" style={{ height: 120, width: 120 }} source={require('../assets/down.png')} />
        </View>
        <View ref="view" style={{ backgroundColor: 'transparent', flex: 0.45, alignItems: 'center' }}>
        <Animatable.View animation="flash" iterationCount="infinite" ref="view" style={{ backgroundColor: '#43A047', height: 50, width: 50, marginTop: 10}}>
        </Animatable.View>
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>For each game if you lose you lose 5€, if you win you get 20€!</Text>
        </View>
        <TouchableOpacity style={{ padding: 20 }} onPress={()=>this.closeTour()}>
          <Animatable.View animation="pulse" iterationCount="infinite">
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Start Game</Text>
          </Animatable.View>
        </TouchableOpacity>
        </View>
        </AnimatedOverlay>
      </ImageBackground>
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
  showRefill: {
    padding: 20,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  hideRefill: {
    height: 0,
    width: 0,
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
