import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const updateProfile = ({route, navigation}) => {
  const [name,setName] =  useState(route.params.name)
  const [contact, setContact] = useState(route.params.contact)
  const [email, setEmail] = useState(route.params.email)
  const [address, setAddress] = useState(route.params.address)
  const [{ error }, setError] = useState(" ")
  const [isloading, setLoading] = useState(false)

  const presshandler = async () => {
    
    let token = await AsyncStorage.getItem('token')
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/
    
    if (!name || !contact || !email || !address ) {
      setError({ error: "Please fill all details" })
    }
    else if (!regex_phone.test(contact)) {
      alert("Please enter valid contact number")
    }
    else {
      setLoading(true)
      fetch(`${Ngrok.url}/api/profileupdate/parent`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: token,
          contact: contact,
          email: email,
          address: address
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setLoading(false)
          if (responseJson.message == "data updated successfully") {
            //Alert.alert('Profile Updated Successfully')
            //navigation.goBack()
          }
          else if ( responseJson.status == 401 ){
            Alert.alert("Contact already exists. please try with a different contact number")
          }
          else {
            Alert.alert("Failed. Please Try Again ")
          }
        })
        .catch(err => {
          setLoading(false)
          console.log(err);
        });
    }
  }


  return (
    <View style={styles.cont}>
      <Text style={styles.text}>Enter details to be changed</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#929292"
          onChangeText={(name) => setName(name)}
          value = {name}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder="Contact"
          maxLength={10}
          placeholderTextColor="#929292"
          onChangeText={(contact) => setContact(contact)}
          value = {contact}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
          value = {email}
        />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#929292"
          onChangeText={(address) => setAddress(address)}
          value = {address}
        />

      </View>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={presshandler} >
        <Text style={styles.loginText}>
          Update Profile</Text>
      </TouchableOpacity>



    </View>

  );
}

export default updateProfile;
