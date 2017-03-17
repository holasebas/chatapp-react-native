import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import SocketIOClient from 'socket.io-client';
export default class profile extends Component {
  constructor(props) {
    super(props);
     const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
        users:ds1.cloneWithRows([]),

    };

    this.socket = SocketIOClient('http://192.168.1.72:8080');
    this.socket.on('users', (messages) =>{
      this.setState({users:ds1.cloneWithRows(messages)})
    })
    
  }
  componentDidMount(){
    this.socket.emit('join', {nickname: this.props.nickname});
  }
   _renderRow(rowData, rowID, sectionID, highlightRow){
    return(
        <View style={styles.item}>
          <Text style={styles.itemText}>{rowData.nickname}</Text>
        </View>
      )
  }

  render() {
    return (
      <View style={styles.container}>
     
      <Text>{this.state.users.nickname}</Text>
          <ListView
            style={styles.listView}
            enableEmptySections={true}
            dataSource={this.state.users}
            renderRow={this._renderRow.bind(this)}
            automaticallyAdjustContentInsets={false}
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
    backgroundColor: '#F5FCFF',
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


