import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import axios from 'axios';

const updateProfile = ({ route, navigation }) => {
  const [name, setName] = useState(route.params.name);
  const [contact, setContact] = useState(route.params.contact);
  const [email, setEmail] = useState(route.params.email);
  const [address, setAddress] = useState(route.params.address);
  const [{ error }, setError] = useState(' ');
  const [isloading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();
  const [type, setType] = useState();

  const presshandler = async () => {
    let token = await AsyncStorage.getItem('token');
    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/;

    if (!name || !contact || !email || !address) {
      setError({ error: 'Please fill all details' });
    } else if (!regex_phone.test(contact)) {
      setError({ error: 'Please enter valid contact' });
    } else {
      setLoading(true);
      axios
        .post(`${Ngrok.url}/api/profileupdate/parent`, {
          id: token,
          contact: contact,
          email: email,
          address: address,
        })
        .then(function (response) {
          setLoading(false);
          if (response.data.message == 'data updated successfully') {
            setToast(true);
            setType(ToastMessage.success);
            SetMessage(ToastMessage.updateProfile);
          }
        })
        .catch(function (error) {
          setLoading(false);
          if (error.response.status == 401) {
            setToast(true);
            setType(ToastMessage.failure);
            SetMessage(ToastMessage.message3);
          } else {
            setToast(true);
            setType(ToastMessage.failure);
            SetMessage(ToastMessage.message5);
          }
        });
    }
    setToast(false);
  };

  return (
    <View style={styles.container}>
      {showtoast ? <ToastComponent type={type} message={message} /> : null}
      <Loader loading={isloading} />
      <Text style={styles.text}>Enter details to be changed</Text>

      <TextInput
        style={styles.TextInput}
        placeholder="Name"
        placeholderTextColor="#929292"
        onChangeText={(name) => setName(name)}
        value={name}
      />

      <TextInput
        keyboardType="numeric"
        style={styles.TextInput}
        placeholder="Phone Number"
        maxLength={10}
        placeholderTextColor="#929292"
        onChangeText={(contact) => setContact(contact)}
        value={contact}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#929292"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Address"
        placeholderTextColor="#929292"
        onChangeText={(address) => setAddress(address)}
        value={address}
      />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={presshandler}>
        <Text style={styles.loginText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default updateProfile;
