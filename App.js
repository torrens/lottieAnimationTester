import React from 'react';
import { Button, Dimensions, Picker, StyleSheet, Text, View } from 'react-native';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;
const { width, height } = Dimensions.get('window');

const animation1 = 'https://raw.githubusercontent.com/torrens/lottieAnimationTester/master/animations/1.json';
const animation2 = 'https://raw.githubusercontent.com/torrens/lottieAnimationTester/master/animations/2.json';
const animation3 = 'https://raw.githubusercontent.com/torrens/lottieAnimationTester/master/animations/3.json';
const animation4 = 'https://raw.githubusercontent.com/torrens/lottieAnimationTester/master/animations/4.json';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      animation: '1'}
  }

  componentWillMount() {
    this.updateAnimation('1')
  }

  updateAnimation = (animation) => {
    this.setState({animation: animation}, () => {
      let animationToLoad = '';
      switch(this.state.animation) {
        case '1':
          animationToLoad = animation1;
          break;
        case '2':
          animationToLoad = animation2;
          break;
        case '3':
          animationToLoad = animation3;
          break;
        case '4':
          animationToLoad = animation4;
          break;
      }

      console.log('fetching', animationToLoad);
      fetch(animationToLoad)
        .then(response => response.json())
        .then(response => { this.setState({loaded: true, data: response })})
        .then( setTimeout(() => {this.lottieAnimation && this.lottieAnimation.play()}, 1000));
    });

  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Lottie Animation Tester</Text>
        <Picker style={styles.picker} selectedValue={this.state.animation} onValueChange={this.updateAnimation} >
          <Picker.Item label='1' value='1' />
          <Picker.Item label='2' value='2' />
          <Picker.Item label='3' value='3' />
          <Picker.Item label='4' value='4' />
        </Picker>
        { this.state.loaded ?
          <View>
            <Lottie
            ref={animation => { this.lottieAnimation = animation; }}
            loop={true}
            style={{
              width: width * 0.50,
              height: width * 0.50,
            }}
            source={this.state.data} />
          </View> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width,
    height: height,
  },
  text: {
    paddingTop: height * 0.05
  },
  picker: {
    paddingTop: height * 0.05,
    height: height * 0.25,
    width: width * 0.5,
  },
});
