import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  AlertIOS

} from 'react-native';

export default class topBar extends Component{

  _goBack(){
    this.props.navigator.pop()
  }

  render(){
    return(
      <View style={styles.barWrap}>
      <View style={styles.back}>
         <TouchableHighlight onPress={()=> this._goBack()}>
       
          <Image source={require('../images/back.png')} style={{width:20, height:23}} />
          </TouchableHighlight>
      </View> 

      <View  style={styles.itemBar}>
       <Text>{this.props.title}</Text>
      </View>

      <View  style={styles.itemBar}>
       <Text></Text>
      </View>
     
      </View>

      )
  }

}

const styles = StyleSheet.create({

barWrap:{
  marginTop:20,
  borderWidth:1,
  alignItems:'center',
  flexDirection:'row',
  padding:10,
  borderBottomColor:'#D2D2D2',
  borderTopColor:'#FFF',
  borderLeftColor:'#FFF',
  borderRightColor:'#FFF'
  
},
itemBar:{
  flex:1,
  alignItems:'center'
},
back:{
  flex:1
}


})