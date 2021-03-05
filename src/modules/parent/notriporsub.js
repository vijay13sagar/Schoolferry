import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { sub } from 'react-native-reanimated';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const oldmap = ({ navigation }) => {
  let [flag, setflag] = useState(true);
  const [userType, setUserType] = useState()

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => { 
      let token = await AsyncStorage.getItem('token')
      let response = await axios(`${Ngrok.url}/api/parent/subscription/${token}`)

      console.log('tracking page:',response.data.payment)
      let data = response.data.payment

      if (data == "subscribed") {
        setUserType(true);
      }
      else{
        setUserType(false)
      }
    })
    

    fetchData;
  }, [navigation])


  const Nosubs = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <View style={styles.body}>
          <Text style={styles.name}>Add subscription</Text>
        </View>
        <Text style={styles.centerview} >To subscribe to a plan , please verify location </Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('location', { refresh: true })}>
          <Text style={{ fontSize: 17 }}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const Subs = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <View style={styles.body}>
          <Text style={styles.name}>No Trips</Text>
        </View>
        <Text style={styles.centerview} >There are No Active Trips Today</Text>
      </View>
    );
  }
  return (
    <View style={styles.container} >
      {userType ? <Subs /> : <Nosubs />}
    </View>
  );
}

export default oldmap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },

  centerview: {
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 17,

  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '700',

  },
  body: {

    marginVertical: 40,
    alignSelf: 'center'

  },
  headertext: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 35,
    alignItems: 'center'
  },

  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
  },

});
