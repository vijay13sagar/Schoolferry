import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ngrok from '../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loader from '../components/Loader';
import styles from '../components/style';
import ToastComponent from '../components/Toaster';
import * as ToastMessage from '../constants/ToastMessages';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{emailError}, setEmailError] = useState('');
  const [isloading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();

  const pressHandler = () => {
    navigation.navigate('Sign up');
  };

  validateEmail = (email) => {
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/;

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
    navigation.navigate('OTPscreen', {item: email});
  };

  const handleSubmitpPress = async () => {
    let firebaseToken = await AsyncStorage.getItem('FBtoken');
    if (validateFunction()) {
      setLoading(true);
      axios
        .post(`${Ngrok.url}/api/login`, {
          id: email,
          password: password,
          token: firebaseToken,
        })
        .then(function (response) {
          setLoading(false);
          if (response.data[1] == 'Parent') {
            AsyncStorage.setItem('token', response.data[0]);
            navigation.replace('Parent Interface');
          } else if (response.data[1] == 'Driver') {
            AsyncStorage.setItem('token', response.data[0]);
            navigation.replace('Driver Interface');
          } else if (response.data[1] == 'Admin') {
            AsyncStorage.setItem('token', response.data[0]);
            navigation.replace('Admin Interface');
          } else if (response.data[1] == 'Nanny') {
            AsyncStorage.setItem('token', response.data[0]);
            navigation.replace('Nanny Interface');
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          if (error.response.status == 401) {
            if (error.response.data.message == 'Token not provided') {
              setToast(true);
              SetMessage(ToastMessage.message2);
            } else if (
              error.response.data.message == 'OTP verification not done'
            ) {
              gotootpscreen();
            } else if (
              error.response.data.message == 'Invalid contact/password' ||
              error.response.data.message == 'Invalid contact/Password'
            ) {
              setToast(true);
              SetMessage(ToastMessage.message1);
            }
          } else {
            setToast(true);
            SetMessage(ToastMessage.message5);
          }
          
        });
      setToast(false);
    }
  };

  return (
    <View style={styles.cont2}>
      {showtoast ? (
        <ToastComponent type={ToastMessage.failure} message={message} />
      ) : null}
      <Loader loading={isloading} />
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      <Image
        style={{width: '80%', height: '25%', marginBottom: 20}}
        source={require('../assets/Logo.png')}
      />
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
