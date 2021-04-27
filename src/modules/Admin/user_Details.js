import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image, 
  Text,
  View,
  StatusBar, ActivityIndicator, FlatList
} from 'react-native';
import { Card, CardList, CardItem, Body, ListItem } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
import axios from 'axios';


export default function user_Details({ route, navigation }) {


  const [childlists, getData] = useState()

  const [dimg, setdImg] = useState('https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png');


  useEffect(() => {
    let take1 = route.params.item.id
    axios
    .get(`${Ngrok.url}/api/parent/detail/childlist/${take1}`)
    .then(function (response) {
      getData(response.data)
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
    });
    
  }, [])




  return (
    <View style={styles.container1}>
      <StatusBar style="auto" />

      <View style={{ width: "70%", marginLeft: 35, marginTop: 30, }}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text >

          {route.params.item.name}

        </Text>
      </View>

      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>Email ID</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.email}

        </Text>
      </View>

      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>Phone Number</Text></View>
      <View style={styles.details}>
        <Text >

          {route.params.item.contact}

        </Text>
      </View>


      <Text style={{
        fontSize: 20,
        marginTop: 10, alignSelf: "center", marginBottom: 5,
        fontWeight: "bold"
      }} >

        Child List

</Text>

      <FlatList
        data={childlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card>
            <CardItem button onPress={() => navigation.navigate('child_Details', { item: item })}>
              <Body>
              <View style={{flexDirection:"row"}}>      
                <Image style={styles.licence3} source={item.photoUrl ? { uri: (item.photoUrl) }:{ uri: (dimg) }} />         
                   <Text style={{alignSelf:"center",marginLeft:10,fontSize: 15,
        color: "black",
        fontWeight: '700',}}>
                 
                   {
                      item.childName
                   }
                </Text>
                </View>

                {/* <Text>
                  {
                    item.childName
                  }
                </Text> */}
              </Body>
            </CardItem>
          </Card>
        )}
      />

    </View>
  );

}
