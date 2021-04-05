import React, { useEffect, useState } from 'react';
import { Text, Alert, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const Profile = ({ navigation }) => {
  const [data, getData] = useState([])
  const [isloading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = navigation.addListener('focus',async () => {
      setLoading(true)
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
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
        });
    });
    fetchData;
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
    //AsyncStorage.removeItem('token');
    //window.localStorage.clear();
    //AsyncStorage.clear()

  }

  return (
    <ScrollView style={styles.container}>
      <Loader loading={isloading} />
      <TouchableOpacity style={styles.edit}
        onPress={() => navigation.navigate('Update profile', {
          con: data.contact,
          add: data.address,
        })
        }>
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
      <TouchableOpacity style={styles.logoutBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Profile;
