import React, {useEffect, useState} from 'react';
import {Text, Alert, View, TouchableOpacity, Modal, Image} from 'react-native';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [data, getData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get(
          `${Ngrok.url}/api/profiledetails/parent/${token}`,
        );
        getData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });

    fetchData;
  }, [navigation]);

  const onPressLogout = async () => {
    try {
      AsyncStorage.removeItem('token');
      navigation.replace('Login');
      Alert.alert('You have been logged out');
    } catch (error) {
      console.log('Error clearing app data.');
    }
  };

  return isloading ? (
    <ScrollView style={styles.container}>
      <Loader loading={isloading} />
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <Loader loading={isloading} />

      <TouchableOpacity
        style={styles.edit}
        onPress={() =>
          navigation.navigate('Update profile', {
            name: data.name,
            email: data.email,
            contact: data.contact,
            address: data.address,
          })
        }>
        <Text style={styles.loginText}>
          Edit{' '}
          <Ionicons name="create" color="#FFF" size={19} style={styles.icon} />
        </Text>
      </TouchableOpacity>
      <Image
        style={{...styles.profileView,borderRadius:60, marginTop:0}}
        source={{
          uri:
            'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png',
        }}
      />
      <View style={{flexDirection: 'row', alignSelf: 'center'}}></View>
      <View style={styles.body}>
        <Text style={styles.name}>Hello,{data.name}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext}>Name</Text>
        <Text style={styles.details}>{data.name}</Text>
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
      <TouchableOpacity style={styles.loginBtn}>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Change Password')}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => onPressLogout()}>
        <Text style={styles.loginText}>
          Log Out{' '}
          <Ionicons
            name="log-out-outline"
            color="#FFF"
            size={19}
          />
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
