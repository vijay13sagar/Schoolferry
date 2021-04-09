import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { event } from "react-native-reanimated";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';


export default function Edit_Vehicle({ route ,navigation}) {
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;
  console.log("sfsdffasdas", c);
  let vehicleid = route.params.item.id;
  console.log("apistarts",vehicleid)

  const pressHandler = () => {
    setLoading(true);
    fetch(`${Ngrok.url}/api/admin/trips/vehicle/new`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vehicleid : vehicleid,
             tripid : c
    
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson);
        if (responseJson.message == "vehicle changed") {
          Alert.alert('Changed Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page')}])
        } else {
          //Alert.alert('Try again!')
          setToast(true)
        }
        //alert(JSON.stringify(response))
      })
      .catch(err => {
        setLoading(false);
        setToast(true)
        console.log(err);
      });
  
      setToast(false)
}


return (
<View style={styles.container1}>
{showtoast? (<ToastComponent type = {ToastMessage.failure}  message = {ToastMessage.message5}/>): null}
  <ScrollView>
     <Loader loading={isloading} />
    
      <StatusBar style="auto" />
      <View style={{ width: "70%", marginLeft: 35,marginTop:40}}>
        <Text>Vehicle ID</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.id}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>Vehicle NO</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.regNo}

        </Text>
      </View>
      <View style={{ width: "70%",marginLeft: 35 }}>
        <Text>Capacity</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.capacity}

        </Text>
      </View>

      <View style={{ width: "70%",marginLeft: 35 }}>
        <Text>Type</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.type}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35}}>
        <Text>Model</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.model}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>GPS NO</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.gps}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.TextInput}>Assign Vehicle</Text>
      </TouchableOpacity>

   
  </ScrollView>
  </View>
);

}
