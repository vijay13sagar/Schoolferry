import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Ngrok from '../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import styles from '../components/style';
import ToastComponent from '../components/Toaster';
import * as ToastMessage from '../constants/ToastMessages';

const Otpscreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(['-', '-', '-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isloading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();

  const email = route.params.item;

  useEffect(() => {
    Resendotp();
  }, []);

  const Resendotp = () => {
    setLoading(true);
    axios
      .get(`${Ngrok.url}/api/user/${email}`)
      .then(function (response) {
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        setToast(true);
        SetMessage(ToastMessage.ResendOTP);
        console.log('error', error.message);
      })
      .finally(function () {});
    setToast(false);
  };

  const Validateotp = async () => {
    setLoading(true);
    if (otp == null) {
      setOtpError('OTP Field Cannot be Empty');
    } else {
      let firebaseToken = await AsyncStorage.getItem('FBtoken');
      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/user/match`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: {
            contact: email,
            otp: otp,
            token: firebaseToken,
          },
        })
          .then(function (response) {
            setLoading(false);
            if (response.status == 200) {
              if (response.data.verificationStatus == 'verified') {
                setOtpError(null);

                if (response.data.login[1] == 'Parent') {
                  AsyncStorage.setItem('token', response.data.login[0]);
                  navigation.replace('Parent Interface');
                } else if (response.data.login[1] == 'Driver') {
                  AsyncStorage.setItem('token', response.data.login[0]);
                  navigation.replace('Driver Interface');
                } else if (response.data.login[1] == 'Admin') {
                  AsyncStorage.setItem('token', response.data.login[0]);
                  navigation.replace('Admin Interface');
                } else if (response.data.login[1] == 'Nanny') {
                  AsyncStorage.setItem('token', response.data.login[0]);
                  navigation.replace('Nanny Interface');
                }
              } else if (response.data.verificationStatus == 'not verified') {
                setToast(true);
                SetMessage(ToastMessage.incorrectOtp);
              }
            } else if (response.status == 401) {
              if (response.data.message == 'OTP not sent') {
                setToast(true);
                SetMessage(ToastMessage.ResendOTP);
              } else if (response.data.message == 'Invalid Contact') {
                setOtpError('Enter Valid Contact');
              }
            }
          })
          .catch(function (error) {
            setLoading(false);
            setToast(true);
            SetMessage(ToastMessage.message5);
            console.log(error);
          });
      } catch (error) {
        console.log('errordetails', error);
      }
    }
    setToast(false);
  };

  return (
    <View style={styles.cont2}>
      {showtoast ? (
        <ToastComponent type={ToastMessage.failure} message={message} />
      ) : null}
      <Loader loading={isloading} />
      <Text style={styles.tripsTitleText}>Verify Your Mobile Number</Text>
      <Text style={{marginVertical: 20, fontWeight: '300'}}>
        Enter your OTP here
      </Text>
      <TextInput
        onChangeText={(value) => {
          if (value.length > 6) {
            return;
          }
          let val = value + '------'.substr(0, 6 - value.length);
          let a = [...val];
          setOtpVal(a), setOtp(value), console.log('value', otp);
        }}
        style={{height: 0}}
        maxLength={6}
        autoFocus={true}
        keyboardType="numeric"
      />
      <View style={styles.otpBoxesContainer}>
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <Text style={styles.otpBox} key={index}>
            {otp[item]}
          </Text>
        ))}
      </View>

      <Text style={{marginVertical: 20, fontWeight: '300'}}>
        Didn't receive otp?
      </Text>
      <TouchableOpacity onPress={() => Resendotp()}>
        <Text style={{textDecorationLine: 'underline', color: '#1E90FF'}}>
          Resend OTP
        </Text>
      </TouchableOpacity>
      <Text style={styles.error}>{otpError}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => Validateotp()}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otpscreen;
