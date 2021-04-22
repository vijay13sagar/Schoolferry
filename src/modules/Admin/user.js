import React, { Component } from 'react';
import { ActivityIndicator,StatusBar, FlatList, Text, View } from 'react-native';
import {  Card, CardItem, Body } from 'native-base';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
import axios from 'axios';
export default class userList extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    var self=this;
    axios
    .get(`${Ngrok.url}/api/admin/home/parents`)
    .then(function (response) {
      self.setState({ data: response.data });
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
      self.setState({ isLoading: false });
    });
    
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container1}>
        <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor= '#FF5C00'     
        translucent={false}
      />
      <Text style={{alignSelf:"center",marginTop:6,fontSize:20}}>List of customers</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
        <Card>
        <CardItem button onPress = {()=>this.props.navigation.navigate('user_Details',{item:item})}>
              <Body>
                <Text>
                   {
                     item.name
                   }
                </Text>
              </Body>
            </CardItem>
            </Card>
            )}
          />
        )}
    </View>
      
    );
  }
};


