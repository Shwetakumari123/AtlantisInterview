/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
// eslint-disable-next-line prettier/prettier
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,AppState,Switch } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {login} from './action';
import BackgroundTimer from 'react-native-background-timer'

// Screen Dimensions
const { height, width } = Dimensions.get('window');
// Screen: Counter
class Home extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        isEnabled:false,
    }
  }

componentDidMount () {
  const {isSessionActive} = this.props;
  this.setState({isEnabled:isSessionActive});
   AppState.addEventListener('change', this._handleAppStateChange);
}


componentWillUnmount() {
    this.startTimer();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

 startTimer = async() => {
   const {login,isSessionActive} = this.props;
   const data = {
     isSessionActive:false,
   };
   if (isSessionActive === true){
    login(data);
   }
     }
 
  _handleAppStateChange = (nextAppState) => {
    const {isSessionActive} = this.props;
 
    this.setState({ appState: nextAppState });
 
    if (nextAppState === 'background') {

      if (isSessionActive === true){
        const timeOut = BackgroundTimer.setTimeout(() => { 
          this.startTimer();
          }, 
          60000);
              }
    }
 
    if (nextAppState === 'active') {
      console.log("App is in Active Foreground Mode.")
    }
  };

  onPressFunction = () => {
    const {login} = this.props;
    const data = {
    isSessionActive:true,
   };
   login(data);
  };

  toggleSwitch = () => {
    const {isEnabled} = this.state;
    this.setState({isEnabled : !isEnabled});
  }

  render() {
    const {login,isSessionActive} = this.props;
    const {isEnabled} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style = {{ justifyContent:'center',flex:1, alignContent:'center',alignItems:'center' }}>
        <Switch
          style = {{fontSize:60,paddingBottom:20}}
          trackColor={{ false: 'grey', true: 'grey' }}
          thumbColor={isEnabled ? 'green' : 'grey'}
          onValueChange={this.toggleSwitch}
          value={isEnabled}
        />
        {isEnabled ? <Text style = {{ fontSize:18,fontWeight:'bold'}}>The User is loggedIn</Text> : <Text style = {{ fontSize:18,fontWeight:'bold'}}> The User is not LoggedIn</Text>}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   },
   });

const mapStateToProps = state => ({
  isSessionActive: state.home.isSessionActive,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  );
  };

export default connect(mapStateToProps,mapDispatchToProps)(Home);