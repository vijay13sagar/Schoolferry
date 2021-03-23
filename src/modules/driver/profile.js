import React, { useEffect, useState } from 'react';
import { Text,Alert, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ navigation }) => {
  const [data, getData] = useState([])


    useEffect(() => {
      (async () => {
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/profiledetails/driver/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        getData(responseJson)
      })
      .catch(err => {
        console.log(err);
      });
    })();
  }, [])
  const onPressLogout = async () => {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
      AsyncStorage.removeItem('token');
      console.log("working");
      navigation.replace('Login');
    Alert.alert('You have been logged out');
  } catch (error) {
      console.error('Error clearing app data.');
  }
    //AsyncStorage.removeItem('token');
    //window.localStorage.clear();
    //AsyncStorage.clear()
    
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.edit} onPress={()=> navigation.navigate("Update profile")}>
        <Text style={styles.loginText} >Edit</Text>
      </TouchableOpacity>
      
      <View style={styles.body}>
        <Text style={styles.name}>Hello,{data.name}</Text>
      </View>

      <View style={styles.textview}>
        <Text style={styles.headertext} > User ID</Text>
        <Text style={styles.details}>{data.id}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Name</Text>
        <Text style={styles.details}>{data.name}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Contact</Text>
        <Text style={styles.details}>{data.contact}</Text>
      </View>
  
      <View style={styles.textview}>
        <Text style={styles.headertext} >Address</Text>
        <Text style={styles.details}>{data.address}</Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
      >
        <Text style={styles.loginText} onPress={() => navigation.navigate("Change Password")}
        >
          Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  edit:{
    flexDirection:'row-reverse',
    height:35,
    backgroundColor:'#ff5c8d',
    width:70,
    alignSelf:'flex-end',
    marginTop:15,
    marginHorizontal:20,
    alignItems:'center',
    justifyContent:'center',
    //borderColor:'black',
    borderRadius:12,
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  body: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom:20,

  },
  textview: {
    marginBottom: 7,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 35,
    marginBottom:2,
  },
  details: {
    backgroundColor: "#d3d3d3",
    borderRadius: 12,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 15,
  },
  detailsAddress:{
    height: 80,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  }

});