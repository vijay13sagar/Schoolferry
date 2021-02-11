import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { event } from "react-native-reanimated";
import Ngrok from '../constants/ngrok';
//import loginApi from '../../repository/exportlogin'
import AsyncStorage from '@react-native-community/async-storage';
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ emailError }, setEmailError] = useState("");
  const [{ passwordError }, setPasswordError] = useState("");
  const pressHandler = () => {
    navigation.navigate('Sign up');
  }
  validateEmail = (email) => {
    //var regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/
    //return regex_mail.test(email)
    if (regex_phone.test(email)) {
      return true
    }
    return false
  };
  const validateFunction = () => {
    if (!email) {
      setEmailError({ emailError: "Email/Phone Field Cannot be Empty" })
      return false
    }
    if (!validateEmail(email)) {
      setEmailError({ emailError: "Enter Valid Email/Phone" })
      return false
    }
    if (!password) {
      setPasswordError({ passwordError: "Password Cannot be Empty" })
      return false
    }
    return true
  }
  const handleSubmitpPress = () => {
    if (validateFunction()) {
      /* const body = {
         id: email,
          password: password
       }*/
      /*let response = await loginApi(body)*/
      fetch(`${Ngrok.url}/api/login`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson[1] == "Parent") {
            AsyncStorage.setItem("token", responseJson[0])
            navigation.replace('Parent Interface')
          } else if (responseJson[1] == "Driver") {
            AsyncStorage.setItem("token", responseJson[0])
            navigation.replace('Driver Interface')
          }
          else if (responseJson[1] == "Admin") {
            AsyncStorage.setItem("token", responseJson[0])
            navigation.replace('Admin Interface')
          }
          else if (responseJson[1] == "Nanny") {
            AsyncStorage.setItem("token", responseJson[0])
            navigation.replace('Nanny Interface')
          }
          else {
            alert('Login failed ')
          }
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
        backgroundColor='#e91e63'
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes
      />
      <View style={styles.inputView} >
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder="Email/Phone"
          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <Text style={styles.error}>{emailError}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#929292"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Text style={styles.error}>{passwordError}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}  >
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}
        onPress={handleSubmitpPress} >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerTextStyle}>
        Don't Have An Account?
       </Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text style={{
          color: '#1E90FF', textDecorationLine: 'underline', fontSize: 13,
        }}>
          Sign Up
        </Text>
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
    borderColor: '#B0003A',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 5,
    //opacity: 0.5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  error: {
    color: '#DC143C',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  forgot_button: {
    height: 30,
    color: '#1E90FF',
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    backgroundColor: "#ff5c8d",
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});