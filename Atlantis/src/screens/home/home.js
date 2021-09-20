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



shouldComponentUpdate(prevProps,nextState)
{
  if (nextState!== prevProps)
  return true;
  else
  return false;

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
   this.setState({isEnabled:false});
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
    const {isEnabled} = this.state;
    const data = {
    isSessionActive: isEnabled,
   };
   login(data);
  };

  toggleSwitch = async() => {
    const {isEnabled} = this.state;
    await this.setState({isEnabled : !isEnabled});
    this.onPressFunction()
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
          thumbColor={isSessionActive ? 'green' : 'grey'}
          onValueChange={this.toggleSwitch}
          value={isSessionActive}
        />
        {isSessionActive ? <Text style = {{ fontSize:18,fontWeight:'bold'}}>Session is Active</Text> : <Text style = {{ fontSize:18,fontWeight:'bold'}}> Session Expired</Text>}
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
    backgroundColor:'white'
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