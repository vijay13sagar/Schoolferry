import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';


const Checklist = ({navigation,route}) => {
  const [contact, setContact] = useState(route.params.con)
  const [address, setAddress] = useState(route.params.add)
  const [{ error }, setError] = useState(" ")

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
          if (responseJson.message == "data updated successfully") {
            navigation.goBack()
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#F9F2F2",
    //alignItems:'center'
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,

  },
  error: {
    color: '#DC143C',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#ff5c8d',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: "#fff",
    marginTop: 15,
    //opacity: 0.5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 30,
  },
  loginText: {
    fontSize: 15,
  }


})