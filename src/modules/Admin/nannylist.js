import React, { Component } from 'react';
import { ActivityIndicator,Image, FlatList, Text, View } from 'react-native';
import {  Card, CardItem, Body } from 'native-base';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
import axios from 'axios';

export default class nannyList extends Component  {
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
   .get(`${Ngrok.url}/api/admin/home/nannies`)
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
    const img = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-512.png    ';
    const b="NULL"
    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
             
        <Card>
        <CardItem button onPress = {()=>this.props.navigation.navigate('nanny_Details',{item:item})}>
              <Body>
              <View style={{flexDirection:"row"}}>      
                <Image style={styles.licence2} source={item.photoUrl=="NULL"  ? { uri: (img) }:{ uri: (item.photoUrl) }} />         
                   <Text style={{alignSelf:"center",marginLeft:10,fontSize: 15,
        color: "black",
        fontWeight: '700',}}>
          Name:        
                   {
                      item.name
                   }
                </Text>
                </View>
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

