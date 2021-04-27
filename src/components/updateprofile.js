import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ngrok from '../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import ToastComponent from './Toaster';
import axios from 'axios';
import * as ToastMessage from '../constants/ToastMessages';
import Loader from './Loader';

const Updateprofile = ({ navigation, route }) => {
  const [contact, setContact] = useState(route.params.con)
  const [address, setAddress] = useState(route.params.add)
  const [{ error }, setError] = useState(" ")
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  const [person, setPerson] = useState();
  useEffect(async () => {
    let token = await AsyncStorage.getItem('token')
    if (token[0] === 'N') {
      setPerson('nanny')
    } else if (token[0] === 'D') {
      setPerson('driver')
    }

  }, []);
  const presshandler = async () => {
    let token = await AsyncStorage.getItem('token')
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/

    if (!contact || !address) {
      setError({ error: "Please fill all details" })

    }
    else if (!regex_phone.test(contact)) {
      Alert.alert("Please enter valid contact number")
    }
    else {
      setLoading(true);
      axios
        .post(`${Ngrok.url}/api/profileupdate/${person}`, {
          id: token,
          contact: contact,
          address: address
        })
        .then(function (response) {
          setLoading(false);
          if (response.data.message == "data updated successfully") {
            setToast(true)
            SetMessage(ToastMessage.updateProfile)
            setError({ error: "" })
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }
    setToast(false)
  }
  return (
    <View style={styles.cont}>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      {showtoast ? (<ToastComponent type={ToastMessage.success} message={message} />) : null}
      <Loader loading={isloading} />
      <Text style={styles.text}>Enter your new details</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.TextInput}
        maxLength={10}
        placeholder="Contact"
        placeholderTextColor="#929292"
        onChangeText={(contact) => setContact(contact)}
        value={contact}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Address"
        placeholderTextColor="#929292"
        onChangeText={(address) => setAddress(address)}
        value={address}
      />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={presshandler}>
        <Text style={styles.loginText}>
          Update Profile</Text>
      </TouchableOpacity>
    </View>

  );
}

export default Updateprofile;

