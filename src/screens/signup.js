import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Ngrok from '../constants/ngrok';
import axios from 'axios';
import Loader from '../components/Loader';
import styles from '../components/style';
import ToastComponent from '../components/Toaster';
import * as ToastMessage from '../constants/ToastMessages';

export default function App({route, navigation}) {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [contact, setcontact] = useState('');
  const [password1, setpassword1] = useState('');
  const [password2, setpassword2] = useState('');
  const [isloading, setLoading] = useState(false);
  const [{emptyFields}, setemptyFeilds] = useState('');
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();

  const validateEmail = (email) => {
    const regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (regex_mail.test(email)) {
      return true;
    }
  };
  const validatecontact = (contact) => {
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/;
    if (regex_phone.test(contact)) {
      return true;
    } else {
      return false;
    }
  };

  const validateFunction = () => {
    if (!Name || !email || !contact || !password1 || !password2) {
      setemptyFeilds({emptyFields: 'Please Enter All The Details'});
      return false;
    } else if (!validateEmail(email)) {
      setemptyFeilds({emptyFields: 'Enter Valid Email Id'});

      return false;
    } else if (!validatecontact(contact)) {
      setemptyFeilds({emptyFields: 'Enter Valid Phone Number'});

      return false;
    } else if (password1 !== password2) {
      setemptyFeilds({emptyFields: 'Both Fields should be same'});

      return false;
    } else {
      return true;
    }
  };

  const pressHandler = () => {
    if (validateFunction()) {
      setLoading(true);
      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/parent/signup`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: {
            name: Name,
            email: email,
            contact: contact,
            password: password1,
          },
        })
          .then(function (response) {
            setLoading(false);
            if (response.status == 200) {
              Alert.alert('Signup Successful, Please Verify phone Number', '', [
                {
                  text: 'Proceed',
                  onPress: () =>
                    navigation.navigate('OTPscreen', {item: contact}),
                },
              ]);
            }
          })
          .catch(function (error) {
            setLoading(false);
            //console.log(error.response.data.message);
            if (error.response.status == 401) {
              setToast(true);
            }
          });
      } catch (error) {
        setLoading(false);
        console.log('errordetails', error);
      }
    }
    setToast(false);
  };

  return (
    <View style={styles.cont2}>
      {showtoast ? (
        <ToastComponent
          type={ToastMessage.failure}
          message={ToastMessage.message3}
        />
      ) : null}
      <Loader loading={isloading} />
      <View>
        <Image
          style={{...styles. logoImage}}
          source={require('../assets/Logo.png')}
        />
      </View>

      <TextInput
        style={styles.TextInput}
        placeholder="Name"
        placeholderTextColor="#929292"
        onChangeText={(Name) => setName(Name)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#929292"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#929292"
        onChangeText={(contact) => setcontact(contact)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#929292"
        secureTextEntry={true}
        onChangeText={(password1) => setpassword1(password1)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Confirm Password"
        placeholderTextColor="#929292"
        secureTextEntry={true}
        onChangeText={(password2) => setpassword2(password2)}
      />
      <Text style={styles.error}>{emptyFields}</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={pressHandler}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}
