import React,{useState} from 'react';
import { Statusbar,Alert, Text, View, TextInput, TouchableOpacity } from "react-native";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';
import Loader from '../../components/Loader';

const Checklist = ({route,navigation}) => {
 
  const [contact,setContact] = useState(route.params.con)
  const [address,setAddress] = useState(route.params.add)
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);

  const presshandler = async () => {
    if(!contact && !address){
      Alert.alert("Failed","Fields should not be empty");
    }else{
      setLoading(true);
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
        setLoading(false);
        if (responseJson.message == "data updated successfully") {
          setToast(true)
          SetMessage(ToastMessage.updateProfile)
        } else {
          Alert.alert('Failed','Number already exist')
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
    }
    setToast(false)
  }
  return (
    <View style={styles.cont}>
      {showtoast? (<ToastComponent type = {ToastMessage.success}  message = {message}/>): null}
      <Loader loading={isloading} />
      <Text style={styles.text}>Enter your new details</Text>
        <View style={styles.inputView} >
          <TextInput
            keyboardType="numeric"
            style={styles.TextInput}
            placeholder="Contact"
            maxLength={10}
            placeholderTextColor="#929292"
            onChangeText={(contact) => setContact(contact)}
            value={contact}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.TextInput}
            placeholder="Address"
            placeholderTextColor="#929292"
           onChangeText={(address) => setAddress(address)}
           value={address}
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
