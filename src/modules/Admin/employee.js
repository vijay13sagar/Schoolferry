import React, { useState } from "react";
import {
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
import { Picker } from '@react-native-picker/picker';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
const Employee = ({ navigation }) => {

  const [title, settitle] = useState("");
  const [message1, setmessage1] = useState("");
  const [{ emptyFields }, setemptyFeilds] = useState("");
  const [role, setrole] = useState("")
  const [isloading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()


  const validateFunction = () => {

    if (!title || !role || !message1) {
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
            msg: message1,


          }
        })
          .then(function (response) {
            if (response.status == 200) {
              setLoading(false);
              Alert.alert('Notification Sent')
            }
          })
          .catch(function (error) {
            setLoading(false);
            if (error.response.status == 401) {


              setToast(true)
            }

          })

      }
      catch (error) {
        setLoading(false);

        setToast(true)
      }
    }
    setToast(false)
  }

  return (
    <View style={styles.container1}>
      {showtoast ? (<ToastComponent type={ToastMessage.failure} message={ToastMessage.message5} />) : null}

      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor='#FF5C00'
        translucent={false}

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
          <Text style={{
            fontSize: 25,
            marginTop: 10,
            fontWeight: "bold"
          }}>Notifications</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Send Notifications to Different Users</Text>
        </View>
        <Picker
          selectedValue={role}
          style={{ width: '80%', alignSelf: "center" }}

          onValueChange={(role) =>
            setrole(role)
          }>
          <Picker.Item label="Select Receiver" value="0" />
          <Picker.Item label="Driver" value="driver" />
          <Picker.Item label="Nanny" value="nanny" />
          <Picker.Item label="Parent" value="parent" />
        </Picker>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: '800' }}>Title</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput2}


              placeholderTextColor="#929292"
              onChangeText={(title) => settitle(title)}
            />
          </View>
          <Text style={{ fontSize: 17, fontWeight: '800' }}>Message</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput2}
              placeholderTextColor="#929292"
              multiline={true}
              onChangeText={(message1) => setmessage1(message1)}
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
