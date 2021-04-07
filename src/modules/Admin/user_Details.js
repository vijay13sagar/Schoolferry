import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar, ActivityIndicator, FlatList
} from 'react-native';
import { Card, CardList, Body, ListItem } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'



export default function user_Details({ route, navigation }) {
  

  const [childlists, getData] = useState()
  console.log("this.props", route.params.item);


  useEffect(() => {
    let take1 = route.params.item.id
    console.log("token", take1);
    fetch(`${Ngrok.url}/api/parent/detail/childlist/${take1}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("cl", typeof (responseJson));
        console.log("cl", responseJson);
        getData(responseJson)
      })
      .catch(err => {

      });
  }, [])




  return (
      <View style={styles.container1}>
        <StatusBar style="auto" />

        <View style={{ width: "70%",marginLeft:35 ,marginTop:30, }}>
          <Text>Name</Text></View>

        <View style={styles.details}>
          <Text >

            {route.params.item.name}

          </Text>
        </View>

        <View style={{ width: "70%",marginLeft:35  }}>
          <Text>Email ID</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.email}

          </Text>
        </View>

        <View style={{ width: "70%",marginLeft:35 }}>
          <Text>Phone Number</Text></View>
        <View style={styles.details}>
          <Text >

            {route.params.item.contact}

          </Text>
        </View>
        

        <Text style={{ fontSize: 20,
    marginTop: 10,alignSelf:"center",marginBottom:5,
    fontWeight: "bold"}} > 

Child List

</Text>
        
          <FlatList
            data={childlists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              // <Card style={{width:"100%",marginTop:5}}>
                <ListItem style={{backgroundColor:"white",width:"100%",marginTop:5}}
                 onPress= { () => navigation.navigate('child_Details',{item:item})}>
                  <Text>
                    {
                      item.childName
                    }
                  </Text>
                </ListItem>
              // </Card>

            )}
          />
        
      </View>
  );

}
