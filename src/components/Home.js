/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AnimatedOverlay from 'react-native-animated-overlay';
import {DeviceEventEmitter} from 'react-native';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import SlotMachine from './SliderMachine.js';

var randomize = require('randomatic');
var PRNG = require('prng');
var prng = new PRNG(123456789);
var shuffle = require('shuffle-array');
var Sound = require('react-native-sound');

let timer = '';


//const tokens = ['456', '991', '129', '344', '989', '232', '000', '765', '912', '456', '991', '129', '344', '989', '232', '000'];
const tokens = ['120', '889', '120', '889'];

var won = new Sound('won.mp3', Sound.MAIN_BUNDLE, (error) => {
if (error) {
console.log('failed to load the sound', error);
return;
}
// loaded successfully
console.log('duration in seconds: ' + won.getDuration() + 'number of channels: ' + won.getNumberOfChannels());
});

const {height, width} = Dimensions.get('window');

let symbols = ['🍉', '🍎', '🍇', '🍒', '🍓', '🌶', '🍐', '🍍','🍌', '🍋', '🥝', '🍊'];

let count = 0;

export default class CustomSlotMachine extends Component<{}> {

  constructor () {
  super()
  this.state = {
    token: '000',
    spin: false,
    duration: 2000,
    coin: 20,
    stop: false,
    overlayShow: false,
    win: false,
  };
 }

  static navigationOptions = {
    header: null,
  };

  goToScreen(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }

  slotGen() {
    console.log("The count is---->", count);
    if (count === 4) {
      count = 0;
    } else {
      count = count + 1;
    }
    let test = tokens[count];
    this.setState({ token : test });
  }

  test() {

  }


  handleSpin() {
      shuffle(symbols);
    if (count === 3) {
      count = 0;
    } else {
      count = count + 1;
    }

    this.setState({ spin: true });
    let test = tokens[count];
    console.log("The Values to set----->", test);
    this.setState({ token : test });
    //this.checkResult(test);
  }

  spinner() {
    timer = setInterval(this.handleSpin.bind(this), 1500);
  }


  stopper() {
    clearInterval(timer);
    let coin = this.state.coin - 5;

    if(coin === 0){
      this.setState({ coin: 0 });
    }else{
      this.setState({ coin: coin });
    }
    this.setState({ stop: true });
    this.checkResult(this.state.token);
  }

  checkResult(test) {
    let result = test.split('');
    const allEqual = arr => arr.every( v => v === arr[0] )
    let slotCheck =  allEqual(result);
    if((symbols[result[0]] === symbols[result[1]]) && (symbols[result[0]] === symbols[result[2]]) && (symbols[result[1]] === symbols[result[2]])){
      this.setState({ win: true});
      setTimeout(this.openOverlay.bind(this), 2500);
    }else{
      this.setState({ win: false });
      setTimeout(this.openOverlay.bind(this), 2500);
    }
  }



  closeOverlay() {
    this.setState({overlayShow: false, spin: false});
  }

  openOverlay() {
    if(this.state.win){
      won.play();
      this.setState({coin: this.state.coin + 20 });
    }
    this.setState({overlayShow: true })
  }

  checkCoin() {
    this.setState({ coin: this.state.coin + 20 , overlayShow: false, spin: false });
  }



  render() {
        return (
            <ImageBackground source={require('../assets/bg.jpg')} style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <SlotMachine padding="3" styles={styles.container} width={width/4.5} height={150} text={this.state.token} renderContent={c => <Text style={{fontSize: 65}}>{symbols[c]}</Text>} duration={1000} />
              <TouchableOpacity style={{ padding: 20}} onPress={this.state.spin ? ()=>this.stopper() : ()=>this.spinner()}>
                 {
                   this.state.spin
                   ?
                   <Image resizeMode="contain" style={{ height: 100, width: 200 }} source={require('../assets/stop.png')} />
                   :
                   <Image resizeMode="contain" style={{ height: 100, width: 200 }} source={require('../assets/button.png')} />
                 }
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                <Text style={{  color: '#FFEB3B', fontSize: 20, fontWeight: 'bold' }}>{this.state.coin+'€'}</Text>
              </TouchableOpacity>
              <AnimatedOverlay
                onPress={this.state.coin!==0 ? () => this.closeOverlay() : () => this.test()}
                style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}
                backgroundColor='#000'
                opacity={0.8}
                duration={1000}
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
            </ImageBackground>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
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
});
