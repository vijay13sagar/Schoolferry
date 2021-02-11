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
import Ngrok from '../constants/ngrok';



export default function App(){
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [{ emailError }, setEmailError] = useState("");
  const [{ contactError }, setcontactError] = useState("");
  const [{ emptyFields }, setemptyFeilds] = useState("");
  
  
 const validateEmail = (email) => {
    const regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (regex_mail.test(email)) {
        return true
    }
  };

  const validatecontact = (contact) => {
    
      var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/
  
    if (regex_phone.test(contact)) {
      return true
    }
    else{return false}

  };

  const validateFunction = () => {
    if (!Name||!email || !contact || !password) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
      return false
    }
    else if (!validateEmail(email)) {
      setEmailError({ emailError: "Enter Valid Email Id" })
      setcontactError({contactError:null})
      setemptyFeilds({ emptyFields: null })

      return false
    }
    else if (!validatecontact(contact)) {
      setcontactError({ contactError: "Enter Valid Phone Number" })
      setEmailError({ emailError: null })
      return false
    }
    return true
    
  }




  const pressHandler = () => {
    if (validateFunction()) {
      /* const body = {
         id: email,
          password: password
       }*/
      /*let response = await loginApi(body)*/
    fetch(`${Ngrok.url}/api/parent/signup`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Name,
        email: email,
        contact: contact,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.message == "registered successfully") {
          alert ('Congratulations..Sign Up Successful')
        }else {
          alert('sign up failed')
        }
        //alert(JSON.stringify(response))
      })
      .catch(err => {
        console.log(err);
      });
    }
   }
  return (
    

    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Logo.png")} />
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor= '#e91e63'     
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#929292"
          onChangeText={(Name) => setName(Name)}
        />
      </View>
     
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#929292"
          onChangeText={(contact) => setcontact(contact)}
        />
      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#929292"
          secureTextEntry={false}
          onChangeText={(password) => setpassword(password)}
        />
      </View>

      <Text style={styles.error}>{emptyFields}</Text>
      <Text style={styles.error}>{emailError}</Text>
      <Text style={styles.error}>{contactError}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
        <Text style={styles.loginText}>SIGN UP</Text>

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
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,

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