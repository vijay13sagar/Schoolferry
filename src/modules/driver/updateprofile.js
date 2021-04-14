import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';
import Loader from '../../components/Loader';

const Checklist = ({navigation,route}) => {
  const [contact, setContact] = useState(route.params.con)
  const [address, setAddress] = useState(route.params.add)
  const [{ error }, setError] = useState(" ")
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);

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
      fetch(`${Ngrok.url}/api/profileupdate/driver`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: token,
          contact: contact,
          address: address
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setLoading(false);
          if (responseJson.message == "data updated successfully") {
            setToast(true)
            SetMessage(ToastMessage.updateProfile)
            //navigation.goBack()
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
    setToast(false)
  }
  return (
    <View style={styles.cont}>
      {showtoast? (<ToastComponent type = {ToastMessage.success}  message = {message}/>): null}
      <Loader loading={isloading} />
      <Text style={styles.text}>Enter your new details</Text>
      <View style={styles.inputView} >
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          maxLength={10}
          placeholder="Contact"
          placeholderTextColor="#929292"
          onChangeText={(contact) => setContact(contact)}
          value={contact}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#929292"
          onChangeText={(address) => setAddress(address)}
          value={address}
        />

      </View>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={presshandler}>
        <Text style={styles.loginText}>
          Update Profile</Text>
      </TouchableOpacity>
    </View>

  );
}

export default Checklist;

