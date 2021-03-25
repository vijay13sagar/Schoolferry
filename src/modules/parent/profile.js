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
      <View style={styles.body}>
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
      <TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
  edit: {
    flexDirection: 'row-reverse',
    height: 35,
    backgroundColor: '#ff5c8d', //'#ff6090',
    width: 70,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //borderColor:'black',
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  body: {
    marginVertical: 23,
    alignSelf: 'center',
  },
  textview: {
    marginBottom: 7,
  },
  headertext: {
    fontSize: 16,
    marginLeft: 30,
  },
  details: {
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    width: '85%',
    padding: 8,
    alignSelf: 'center',
    fontSize: 16,
  },
  loginBtn: {
    width: '50%',
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    // fontWeight:'700'
  },
  detailsAddress: {
    height: 100,
    backgroundColor: '#d3d3d3',
    borderRadius: 12,
    width: '85%',
    padding: 8,
    alignSelf: 'center',
  },
});
