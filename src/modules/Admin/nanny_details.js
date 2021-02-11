import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { event } from "react-native-reanimated";


export default function nanny_Details({ route, navigation }){
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  
  console.log("this.props",route.params.item.releaseYear);
 
  // const pressHandler = () => {
  //   if (validateFunction()) {
  //     /* const body = {
  //        id: email,
  //         password: password
  //      }*/
  //     /*let response = await loginApi(body)*/
  //   fetch("http://eccff4463173.ngrok.io/api/parent/signup", {
  //     "method": "POST",
  //     "headers": {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       firstName: FN,
  //       lastName:LN ,
  //       email: email,
  //       contact: contact,
  //       password: password
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       if (responseJson.message == "registered successfully") {
  //         alert ('Congratulations..Sign Up Successful')
  //       }else {
  //         alert('sign up failed')
  //       }
  //       //alert(JSON.stringify(response))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  //  }
  return (
    

    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%"}}>
        <Text>Name</Text></View> 
        
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.name}
          placeholderTextColor="black"
          onChangeText={(name) => setname(name)}
        />
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Email ID</Text></View> 
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Phone Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.contact}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#929292"
          onChangeText={(contact) => setcontact(contact)}
        />
      </View>
      <View style={{width:"70%"}}>
        <Text>Address</Text></View> 
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.address}
          placeholderTextColor="#929292"
          onChangeText={(Address) => setAddress(Address)}
        />
      </View>
      <View style={{width:"70%"}}>
        <Text>Vehicle Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#929292"
          onChangeText={(VN) => setVN(VN)}
        />
      </View>
     
      <View style={{width:"70%"}}>
        <Text>ID Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#929292"
          onChangeText={(LIC) => setLIC(LIC)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}  >
        <Text style={styles.loginText}>Submit</Text>

      </TouchableOpacity> 

     
      <TouchableOpacity style={styles.loginBtn}  >
        <Text style={styles.loginText}>De-Activate</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}  >
        <Text style={styles.loginText}>Statistics</Text>

      </TouchableOpacity>
     

    </View>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },

  TextInput: {
    width: "70%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 2,

  },
  error: {
      padding:1,

    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },


  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',

  },

  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});