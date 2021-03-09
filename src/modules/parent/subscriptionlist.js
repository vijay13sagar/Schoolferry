import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';

const Subscriptions = ({ route, navigation }) => {
  const [data, setData] = useState("")
  const [childid,setChild] = useState (route.params.childID)

  const skool = route.params.school;
  const Homeaddress = route.params.homeaddress;
  const distance = route.params.distance 

    useEffect (  () => { 
     
     async function fetchData () { 
      let token = await childid  
     fetch(`${Ngrok.url}/api/package/${token}`, {
       "method": "GET",
       "headers": {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
     })
       .then(response => response.json())
       .then(responseJson => {
        // console.log(responseJson);
         setData(responseJson)
       })
       .catch(err => {
         console.log(err);
       });
      }

      fetchData();
   }, [])


  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.firstBox}>
        <Text style={styles.planTitleText}>Subscription Plans  </Text>

      </View>
      <View style={{ height: 350, marginTop:15, }}>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ flex: 1, }}>
              <TouchableOpacity style={styles.flatlistContainer} onPress={() => navigation.navigate('Plan Details', {
                item: item,
                schooladdress: skool,
                childid:route.params.childID,
              })}>
                <Image style={styles.avatar} source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />
                <Text style={styles.typeOfSubscription}>{item.term}</Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Trip Cost</Text>
                  <Text style={styles.price}> -  ₹ {item.tripcost}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Nanny</Text>
                  <Text style={styles.price}> -  ₹ {item.nannycost}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>GST</Text>
                  <Text style={styles.price}> -  ₹ {item.gst}</Text>
                </View>
                
                <View style={{ flexDirection: 'row', marginVertical: 5, }}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalCost}> -  ₹ {item.total}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.randomText}>Swipe left to see all plans. </Text>

      <View style={styles.addChildContainer}>
        <Text style={styles.addChildText}>* Compulsory nanny service for children till 8 years</Text>
        <Text style={styles.addChildText}>* In case nanny service is required for children above 8 years , please contact admin</Text>

      </View>
      </ScrollView>
    </View>

  );
}

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,//#F9F2F2
    backgroundColor: "#F9F2F2",
  },
  firstBox: {
    height: '5%',
    flexDirection: 'row',
    marginTop: 20,
    width:'100%',
  },
  planTitleText: {
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10
  },
  flatlist: {
    flex: 1,

  },
  flatlistContainer: {
    flex: 1,
    width: 220,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#ff5c8d',
    marginBottom: 5,
  },
  avatar: {
    width: "100%",
    height: "50%",
  },
  typeOfSubscription: {
    fontSize: 22,
    fontWeight: "700",
    alignSelf: 'center',
    marginTop: 8,
  },
  serviceDetails: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10

  },
  price: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: "700",

  },
  totalText: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,

  },
  totalCost: {
    fontSize: 22,
    fontWeight: "700",

  },
  randomText: {
    fontSize: 15,
    fontWeight: '700',
    color: "#000",
    marginTop: 5,
    marginLeft:15,
  },
  addChildContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    height: 130,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  addChildText: {
    fontSize: 17,
    fontWeight: '700',
    padding: 5,
    color:'#696969',
  },

})