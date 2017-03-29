import React, { Component } from 'react';
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


import SocketIOClient from 'socket.io-client';
import TopBar from './topBar';
import { GiftedChat } from 'react-native-gifted-chat';

var personIcon = require("../images/login1_person.png");
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class chat extends Component {

   constructor(props) {
    super(props);
    this.socket = this.props.socket
    this.state = {
      
      chat: [{
      emitter:this.props.emitter,
      receiver:this.props.receiver,
      message:"Hola",
      date: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
      }],
      message:"",
      messages: []
     

    };
    this.onSend = this.onSend.bind(this);



       
    this.socket.on('receiver', (message) => {
      var data = [ { text: message.message[0].text,
                 user: { _id: 2 },
                 createdAt: message.message[0].createdAt,
                _id: message.message[0]._id } ]




        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, data),
          };
        });
    
      
      })
      
      

  }


   onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

  var objMessage = {
      emitter:this.props.emitter,
      receiver:this.props.receiver,
      message:messages,
  }
    this.socket.emit('send', objMessage)
  }


 


   
  _renderChat(chat){

      return chat.map(function(data, i){
        return(
          <View key={i} style={styles.msj}>
            <Text style={styles.user}>{data.message}</Text>
          </View>
        );
      });

  }
  _goBack(){
    this.props.navigator.pop()
  }

  render() {

    

    return (

  <View style={styles.chatWrap}>

    <TopBar navigator={this.props.navigator} title={this.props.receiver}/>
     <GiftedChat
        style={{borderWidth:1}}
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
         
        }}
      />
  </View>
     

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
   
  },
  form:{
    borderWidth:1,
    flexDirection:'row'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color:'#444',
    backgroundColor:'#FFF',
    borderRadius:15,
    borderWidth:1,
    borderColor:'#dfdfdf'
  },
  inputWrap: {
    padding:5,
    flexDirection: "row",
    borderWidth:1,
    borderBottomColor:'#f2f2f2',
    borderLeftColor:'#f2f2f2',
    borderRightColor:'#f2f2f2',
    borderTopColor:'#c3c3c3',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    backgroundColor:'#fdfdfd'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  chatWrap:{
    width:width,
    height:height
  },
  topBar:{
    marginTop:20,
    borderWidth:1
  },
  msj:{
    borderWidth:1,
    alignItems:'flex-end'
  }
});


