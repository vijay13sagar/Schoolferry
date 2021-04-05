import React, { useEffect, useState } from 'react';
import { Text, View, Alert, ScrollView, TouchableOpacity, StatusBar, Linking, StyleSheet, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';


const Profile = ({ navigation }) => {
  const [data, getData] = useState([])
  const [isloading,setLoading] = useState(false)
  useEffect( () => {
    const fetchData = navigation.addListener('focus',async () => {
      setLoading(true)
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/profiledetails/nanny/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false)
        console.log('response', responseJson);
        getData(responseJson)
        console.log('responsedata', data);
      })
      .catch(err => {
        console.log('error', err);
      });
  });
  fetchData
}, [navigation])
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
  }

  return (

    <View style={styles.cont}>
      <Loader loading = {isloading}/>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      <ScrollView>
        <TouchableOpacity style={styles.edit}>
          <Text style={styles.loginText} onPress={() => navigation.navigate("Updateprof",{con: data.contact,add: data.address,})}>EDIT</Text>
        </TouchableOpacity>
        <View style={styles.body}>
          <Text style={styles.name}>Hello Nanny</Text>
        </View>
        <Text style={styles.headertext} >Name:</Text>
        <Text style={styles.details}>{data.name}</Text>
        <Text style={styles.headertext} >User Id:</Text>
        <Text style={styles.details}>{data.id}</Text>
        <Text style={styles.headertext} >Mobile Number:</Text>
        <Text style={styles.details}>{data.contact}</Text>
        <Text style={styles.headertext} >Address:</Text>
        <Text style={styles.details}>{data.address}</Text>
        {/* <Text style={styles.headertext} >Id Proof:</Text>
         */}
        {/* <View style={styles.imageview}>
          <Image style={styles.id} source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />
        </View> */}
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Passwordchange')}  >
          <Text style={styles.loginText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => onPressLogout()}  >
          <Text style={styles.loginText}>Log Out</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}

export default Profile;
