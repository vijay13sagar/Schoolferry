import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';

const updateProfile = () => {
 
  const [contact,setContact] = useState("")
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")

 const presshandler= async ()=> {
  let token = await AsyncStorage.getItem('token')
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
          if (responseJson.message == "data updated successfully") {
            alert('Profile Updated Successfully')
          } else{
            alert('sorry')
          }
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your new details</Text>
        <View style={styles.inputView} >
          <TextInput
            keyboardType="numeric"
            style={styles.TextInput}
            placeholder="Contact"
            placeholderTextColor="#929292"
            onChangeText={(contact) => setContact(contact)}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
           // keyboardType="numeric"
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#929292"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        
        <View style={styles.inputView} >
          <TextInput
            style={styles.TextInput}
            placeholder="Address"
            placeholderTextColor="#929292"
           onChangeText={(address) => setAddress(address)}
          />

        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={presshandler} >
          <Text style={styles.loginText}>
            Update Profile</Text>
        </TouchableOpacity>



    </View>

  );
}

export default updateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    //alignItems:'center'
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom:10,

  },
  inputView: {
    borderWidth: 1,
    borderColor: '#ff5c8d',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: '#fff',
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
    fontSize: 17,
    fontWeight: 'bold'
  }


})