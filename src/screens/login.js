import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ngrok from '../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loader from '../components/Loader';
import styles from '../components/style';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{emailError}, setEmailError] = useState('');
  const [isloading,setLoading] = useState(false)

  const pressHandler = () => {
    navigation.navigate('Sign up');
  };
  validateEmail = (email) => {
    //var regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/;
    //return regex_mail.test(email)
    if (regex_phone.test(email)) {
      return true;
    }
    return false;
  };
  const validateFunction = () => {
    if (!email) {
      setEmailError({emailError: 'Phone Number Field Cannot be Empty'});
      return false;
    }
    if (!validateEmail(email)) {
      setEmailError({emailError: 'Enter Valid Phone Number'});
      return false;
    }
    if (!password) {
      setEmailError({emailError: 'Password Cannot be Empty'});
      return false;
    }
    return true;
  };
  const gotootpscreen = () => {
    console.log('number', email);
    navigation.navigate('OTPscreen', {item: email});
  };
  const handleSubmitpPress = async () => {
    let firebaseToken = await AsyncStorage.getItem('FBtoken');
    console.log('FB token', firebaseToken);
    if (validateFunction()) {
      /* const body = {
         id: email,
          password: password
       }*/
      //let response = await loginApi(body)/
      setLoading(true)
      fetch(`${Ngrok.url}/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: email,
          password: password,
          token: firebaseToken,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('response:', responseJson);
          //console.log("status", responseJson.status);
          setLoading(false)

          if (responseJson[1] == 'Parent') {
            AsyncStorage.setItem('token', responseJson[0]);
            navigation.replace('Parent Interface');
          } else if (responseJson[1] == 'Driver') {
            AsyncStorage.setItem('token', responseJson[0]);
            navigation.replace('Driver Interface');
          } else if (responseJson[1] == 'Admin') {
            AsyncStorage.setItem('token', responseJson[0]);
            navigation.replace('Admin Interface');
          } else if (responseJson[1] == 'Nanny') {
            AsyncStorage.setItem('token', responseJson[0]);
            navigation.replace('Nanny Interface');
          }

          if (responseJson.status == 401) {
            console.log('message:', responseJson.message);
            if (responseJson.message == 'Token not provided') {
              Alert.alert('Not an exsisting user, please sign up first !');
            } else if (responseJson.message == 'OTP verification not done') {
              //Alert.alert("OTP verification need to be done")
              gotootpscreen();
            } else if (
              responseJson.message == 'Invalid contact/password' ||
              responseJson.message == 'Invalid contact/Password'
            ) {
              Alert.alert('Incorrect contact/password');
            }
          }
        })
        .catch((error) => {
          setLoading(false)
          console.log('error', error.message); // 401  
        // if(error.responseJson.status == 401){
          //   //redirect to login
          //   Alert.alert('Phone Number Alredy Exist!')
          // }
        });
    }
  };
  return (
    <View style={styles.cont2}>
      
      <Loader loading = {isloading}/>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor='#FF5C00'//"#26A7FF"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
      />
      <Image style={{width:'80%',height:'25%',marginBottom:20}} source={require('../assets/Logo.png')} />
      <View style={styles.inputView}>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder="Phone"
          maxLength={10}
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#929292"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Text style={styles.error}>{emailError}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmitpPress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.registerTextStyle}>Don't Have An Account?</Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text
          style={{
            color: '#1E90FF',
            textDecorationLine: 'underline',
            fontSize: 13,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}