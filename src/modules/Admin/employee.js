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
    <View style={styles.container}>

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
        <Text style={styles.loginText}>Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Add_Driver')} >
        <Text style={styles.loginText}>Add Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('nannyList')} >
        <Text style={styles.loginText}>Nanny</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Add_Nanny')} >
        <Text style={styles.loginText}>Add Nanny</Text>
      </TouchableOpacity>
      <View style={styles.pendingTrips1}>
        <Text style={styles.tripsTitleText}>Notifications</Text>
        <Text style={{fontSize:17,fontWeight:'bold'}}>Send Notifications to Different Users</Text>
      </View>
      <Picker
        selectedValue={role}
        style={styles.Picker}

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
        <Text style={styles.loginText}>Confirm</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

export default Employee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    // alignItems: "center",
    // justifyContent: "center",
  },
  pendingTrips1: {
    backgroundColor: "#fff",
    height: 80,
    marginTop: 10,
    width: '90%',
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10
  },
  tripsTitleText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "bold"
  },
  startTripText: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
  Picker: {
    width: "75%",
    marginVertical: 10,
    borderRadius: 10,
    height: 30,
    borderWidth: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  TextInput: {
    height: 50,
    alignItems: "flex-start",
    padding: 10,
    marginLeft: 10,
  },
  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',
  },
  error: {
    padding: 1,
    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
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

});