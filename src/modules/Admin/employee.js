import React , { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-picker/picker';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'
const Employee = ({ navigation }) => {

  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const [{ emptyFields }, setemptyFeilds] = useState("");
  const [role, setrole] = useState("")
  const [isloading, setLoading] = useState(false);



  const validateFunction = () => {

    if (!title || !role || !message) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })

      return false
    }

    else if (role == "0") {
      setemptyFeilds({ emptyFields: "Select valid Reciver" })

      return false
    }
    else {

      setemptyFeilds({ emptyFields: null })

      return true
    }



  }

  function pressHandler() {

    if (validateFunction()) {
      console.log("start");
      try {
        setLoading(true);
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/admin/notifications`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            receiver: role,

            title: title,
            msg: message,


          }
        })
          .then(function (response) {
            if (response.status == 200) {
              setLoading(false);
              Alert.alert('Notification Sent')
            }

            console.log("response", response.status);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            if (error.response.status == 401) {

              Alert.alert('Please try again!')
            }

          })

      }
      catch (error) {
        setLoading(false);
        console.log("errordetails", error);
      }
    }
  }
  
  return (
    <View style={styles.container1}>

      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor='#FF5C00'
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
      <Loader loading={isloading} />
      <ScrollView>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('driverList')} >
        <Text style={styles.TextInput}>Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Add_Driver')} >
        <Text style={styles.TextInput}>Add Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('nannyList')} >
        <Text style={styles.TextInput}>Nanny</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Add_Nanny')} >
        <Text style={styles.TextInput}>Add Nanny</Text>
      </TouchableOpacity>
      <View style={styles.pendingTrips1}>
        <Text style={{ fontSize: 25,
    marginTop: 10,
    fontWeight: "bold"}}>Notifications</Text>
        <Text style={{fontSize:17,fontWeight:'bold'}}>Send Notifications to Different Users</Text>
      </View>
      <Picker
        selectedValue={role}
        style={{width:'80%',alignSelf:"center"}}

        onValueChange={(role) =>
          setrole(role)
        }>
        <Picker.Item label="Select Receiver" value="0" />
        <Picker.Item label="Driver" value="driver" />
        <Picker.Item label="Nanny" value="nanny" />
        <Picker.Item label="Parent" value="parent" />
      </Picker>
      <View style={{alignItems:'center' }}>
      <Text style={{ fontSize: 17,fontWeight:'800'}}>Title</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}

          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(title) => settitle(title)}
        />
      </View>
      <Text style={{ fontSize: 17,fontWeight:'800' }}>Message</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#929292"
          multiline={true}
          onChangeText={(message) => setmessage(message)}
        />
      </View>
      </View>
      <Text style={styles.error}>{emptyFields}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
        <Text style={styles.TextInput}>Confirm</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

export default Employee;
