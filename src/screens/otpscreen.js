import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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

  console.log('params', route.params);
  const email = route.params.item;
  console.log('email', email);

  useEffect(() => {
    Resendotp();
  }, []);

  const Resendotp = () => {
    setLoading(true);
    console.log('email', email);
    axios
      .get(`${Ngrok.url}/api/user/${email}`)
      .then(function (response) {
        console.log('otpstat', response.status);
        console.log('otpmsg', response.data.message);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        setToast(true);
        SetMessage(ToastMessage.ResendOTP);
        console.log('error', error.message);
      })
      .finally(function () {
        // always executed
      });
      setToast(false);  
  };

  const Validateotp = async () => {
    setLoading(true);
    if (otp == null) {
      setOtpError('OTP Field Cannot be Empty');
    } else {
      let firebaseToken = await AsyncStorage.getItem('FBtoken');
      console.log('FB token', firebaseToken);
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
              console.log('hi', response.data.verificationStatus);
              if (response.data.verificationStatus == 'verified') {
                setOtpError(null);
                console.log('response:', response.data);
                console.log('login', response.data.login);

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
                //Alert.alert("Enter Valid Contact")
                setOtpError('Enter Valid Contact');
              }
            }

            console.log('response', response.status);
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
    setToast(false)
  };

  return (
    <View style={styles.cont2}>
        {showtoast ? <ToastComponent type={ToastMessage.failure} message={message} /> : null}
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
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F9F2F2",
//         alignItems: "center",
//         justifyContent: 'center'
//     },
//     tripsTitleText: {
//         fontSize: 25,
//         marginTop: 10,
//         fontWeight: "bold"
//     },
//     otpBoxesContainer: {
//         flexDirection: 'row'
//     },
//     error: {
//         color: '#DC143C',
//         fontSize: 11,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     otpBox: {
//         padding: 10,
//         marginRight: 10,
//         borderWidth: 1,
//         fontSize: 25,
//         borderColor: 'lightgrey',
//         height: 50,
//         width: 50,
//         textAlign: 'center'
//     },
//     loginBtn: {
//         width: "50%",
//         borderRadius: 10,
//         height: 38,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#ff5c8d",
//         alignSelf: "center",
//         marginTop: 20,
//     },
// });
