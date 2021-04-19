import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
 
  StatusBar,
  
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';
import Ngrok from '../../constants/ngrok';

import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'

export default function Edit_Driver({ route,navigation }) {
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;
 
  let driverid = route.params.item.id;


  const pressHandler = () => {

    setLoading(true);
    fetch(`${Ngrok.url}/api/admin/trips/driver/new`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        driverid : driverid,
             tripid : c
    
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
      
        if (responseJson.message == "driver changed") {
          Alert.alert('Changed Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page')}])
        } else {
          setToast(true)
        }
    
      })
      .catch(err => {
        setLoading(false);
       
        setToast(true)
      });
  
      setToast(false)
}


return (
<View style={styles.container1}>
{showtoast? (<ToastComponent type = {ToastMessage.failure}  message = {ToastMessage.message5}/>): null}
  <ScrollView>
     <Loader loading={isloading} />
    
      <StatusBar style="auto" />
      <View style={{ width: "70%", marginLeft: 35,marginTop:40, }}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.name}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>Contact Number</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.contact}

        </Text>
      </View>

      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>driver ID</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.id}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.TextInput}>Assign driver</Text>
      </TouchableOpacity>

   
  </ScrollView>
 </View>
);

}
