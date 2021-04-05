import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const Profile = ({navigation}) => {
  const [data, getData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      try {
        let token = await AsyncStorage.getItem('token');
        fetch(`${Ngrok.url}/api/profiledetails/parent/${token}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            getData(responseJson);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        
      } catch (e) {
        //alert('Failed to save the data to the storage')
      }
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
      console.error('Error clearing app data.',error);
  }
  }

  return isLoading ? (
    <View style={styles.container}>
      <Loader loading={isLoading} />
    </View>
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.edit}
        onPress={() =>
          navigation.navigate('Update profile', {
            name: data.name,
            contact: data.contact,
            email: data.email,
            address: data.address,
          })
        }>
        <Text style={styles.loginText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.body2}>
        <Text style={styles.name}>Hello, {data.name}</Text>
      </View>

      <View style={styles.textview}>
        <Text style={styles.headertext}>Name</Text>
        <Text style={styles.details}>{data.name} </Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext}>Contact</Text>
        <Text style={styles.details}>{data.contact}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext}>Email</Text>
        <Text style={styles.details}>{data.email}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext}>Address</Text>
        <Text style={styles.details}>{data.address}</Text>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Change Password')}>
        <Text style={styles.loginText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Profile;

