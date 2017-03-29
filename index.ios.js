import React, {Component} from 'react'
import {
 AppRegistry,
  View,
  Text,
  Navigator,
  StyleSheet,
  Picker,
  ListView,
  Dimensions,
  TouchableHighlight,
  
} from 'react-native'
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




import Chat from './components/chat';
import Profile from './components/profile';
import Login from './components/login';






export default class chatApp extends Component {

  _rederScene(route, navigator){
    var globalProps = {navigator}

    switch(route.ident){
      case 'Login':
        return(<Login {...globalProps} />)
      case 'Profile':
        return(<Profile {...globalProps} nickname={route.nickname}/>)
      case 'Chat':
        return(<Chat {...globalProps} receiver={route.receiver} emitter={route.emitter}  socket={route.socket}/>)
    }
  }
  _configureScene(route, routeStack){
    switch(route.ident){
      case "Profile":
      return Navigator.SceneConfigs.PushFromRight
      case "Chat":
      return Navigator.SceneConfigs.PushFromRight
      default:
      return Navigator.SceneConfigs.FloatFromRight
    }
  }

  render(){
    return(
       <Navigator
       initialRoute={{ ident: "Login" }}
       renderScene={this._rederScene}
       configureScene={this._configureScene}
       />


      )
  }


}



const styles = StyleSheet.create({
  container: {
    marginTop:120,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor:'red'
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
  picker: {
    width: width,
    backgroundColor:'red'
   
  },
  lista:{
    width:width
  },
  item:{
    fontSize:30,
    textAlign: 'center',
    marginTop:1,
    padding:20,
    backgroundColor: '#E3F2FD'
  }
});






AppRegistry.registerComponent('chatApp', () => chatApp);
