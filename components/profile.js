  import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Navigator,
  AlertIOS,
  Dimensions,
  Image
} from 'react-native';
import SocketIOClient from 'socket.io-client';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
export default class profile extends Component {
  constructor(props) {
    super(props);
     this.socket = SocketIOClient('http://192.168.1.72:8080');
      this.state = {
          users:[{id:1, nickname:"Loading..."}],
          

      };

    
    
    this.socket.on('users', (messages) => {
      this.setState({users:messages})  
    });
       

    
    
  }
 
  componentDidMount(){
      this.socket.emit('join', this.props.nickname);
  }

  _goChat(receiver, emitter, socket ){
     this.props.navigator.push({ ident: "Chat", receiver, emitter, socket })
  }
  

  renderUsers(data, emitter, socket){
    var _goChat = this._goChat.bind(this)  
    return data.map(function(data, index){
      if(data.nickname == emitter){
        return false
      }
        return (
          <View key={index} style={styles.item}>
            <TouchableHighlight activeOpacity={0} underlayColor="#FFFFFF" style={styles.btn} onPress={() => _goChat(data.nickname, emitter, socket)}>
                <Text style={styles.itemText}>{data.nickname}</Text>
            </TouchableHighlight>
          </View>
        )
    })
  }

  render() {
    return (
      <View>
        <View style={styles.profileBar}>
        <Image source={require('../images/bg2.jpg')} style={styles.background} resizeMode="cover">
          <Image source={require('../images/lego.png')} style={styles.profileIcon}/>
          <Text style={styles.nickname}>{this.props.nickname}</Text>
        </Image>
      
         </View>
         {this.renderUsers(this.state.users, this.props.nickname, this.socket)}


       
     
   
        
        
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  item:{  
    
    
    padding:10,
    margin:5,
    
    borderBottomWidth:1,
     borderBottomColor:'#819FF7',
  

  },
  listView:{
    marginTop:20,

  },
  profileBar:{
   
    height:220,
    width:width,
    shadowColor: "#000000",
    shadowOpacity: 0.9,
    shadowRadius: 30,
    shadowOffset: {
      height: 2,
      width: -2
    }
   
  },
  background:{
    width:width,
    height:200,
    alignItems:'center',
    justifyContent:'center',
     
  },
  nickname:{
    color:'#FFF',
  
    padding:5,
    
    fontSize:25

  },
  onlineWrap:{
      width:width,
    height:60,
    flexDirection:'row',
    borderBottomWidth:1,
     borderBottomColor:'#D2D2D2',
     alignItems:'center',
     justifyContent:'center'
  
  },
  profileIcon:{
    width:70,
    height:70,
    borderRadius:35
  },
  btn:{
    
    padding:5
  }

});


