import React,{useState} from 'react';
import { StyleSheet,Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import addchild from '../parent/addingchild';


const Checklist = () => {
 
  const [contact,setContact] = useState("")
  const [address,setAddress] = useState("")

  const presshandler = async () => {
    if(!contact && !address){
      Alert.alert("Failed","Fields should not be empty");
    }else{
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/profileupdate/nanny`, {
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
          Alert.alert('Profile Updated Successfully')
        } else {
          Alert.alert('Failed','Number already exist')
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
            placeholder="Contact"
            maxLength={10}
            placeholderTextColor="#929292"
            onChangeText={(contact) => setContact(contact)}
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
        <TouchableOpacity style={styles.loginBtn} onPress = {presshandler}>
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
    justifyContent:'center',
    backgroundColor: "#F9F2F2",
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