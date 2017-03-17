import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Navigator,
  AlertIOS
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("../images/wall2.jpg");
const mark = require("../images/login1_mark.png");
const lockIcon = require("../images/login1_lock.png");
const personIcon = require("../images/login1_person.png");



import Chat from './chat';
import Profile from './profile';
import Login from './login';


export default class login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      nickname:""
    };
  }
  _goProfile(nickname){
    if(nickname === ""){
      AlertIOS.alert(
       'Empty nickname',
       'Nickname field is required'
      );
    }else{
  
    this.props.navigator.push({ ident: "Profile", nickname })

  } 
  }
  render() {
  
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
           
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Nickname" 
                placeholderTextColor="#FFF"
                style={styles.input}
                onChangeText={(text) => this.setState({nickname:text})}
                value={this.state.nickname} 
              />
            </View>
           
           
            <TouchableOpacity activeOpacity={.5} onPress={() => this._goProfile(this.state.nickname) }>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Do it!</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
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
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color:'#FFF'
  },
  button: {
    backgroundColor: "#c81c56",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});


