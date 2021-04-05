import React, { Component } from 'react';
import { ActivityIndicator,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/style';

export default class ChildList extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  render() {
    const { data, isLoading } = this.state;
    console.log("json",this.props.route.params.childList[0].childId);
    return (
      <View style={styles.cont}>
        
            {/* <Text style={styles.sidehead} >Children List:</Text> */}
          <FlatList
            data={this.props.route.params.childList}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
        <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props.navigation.navigate('Child Details',{item:item})}>
          <Text style={styles.loginText}>{ item.childId } , {item.childName}</Text>
        </TouchableOpacity>
            )}
          />
      </View>
     
    );
  }
};
