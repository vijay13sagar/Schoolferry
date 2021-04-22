import React, { useState } from "react";
import {

  Text,
  View,

  StatusBar,

  Alert,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Ngrok from '../../constants/ngrok';

import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import axios from 'axios';


export default function remove_Child({ route, navigation }) {
  const [isloading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()
  let c = route.params.tripid;
 
  let childid = route.params.item.childId;
  

  const pressHandler = () => {

    setLoading(true);
    axios
    .post(`${Ngrok.url}/api/admin/trips/child/remove`, {
      childid: childid,
     tripid: c
    })
    .then(function (response) {
      
      if (response.data.message == "child removed from the trip") {
              Alert.alert('Removed Successfully', '', [{ text: 'Proceed', onPress: () => navigation.navigate('Home_page') }])
            } else {
              setLoading(false);
             
              setToast(true)
            }
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
        
    });
    
    setToast(false)

  }


  return (
    <View style={styles.container1}>
      {showtoast ? (<ToastComponent type={ToastMessage.failure} message={ToastMessage.message5} />) : null}
      <ScrollView>
        <Loader loading={isloading} />

        <StatusBar style="auto" />
        <View style={{ width: "70%", marginLeft: 35, marginTop: 40 }}>
          <Text>Name</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.childName}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Parent Contact Number</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.parentsContact}

          </Text>
        </View>

        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Age</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.age}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Blood Group</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.bloodGroup}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Pickup Location</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.address}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Drop Location</Text></View>
        <View style={styles.details}>
          <Text>
            {route.params.item.school}

          </Text>
        </View>
        <TouchableOpacity style={styles.loginBtn}
          onPress={pressHandler} >
          <Text style={styles.TextInput}>Remove Child</Text>
        </TouchableOpacity>


      </ScrollView>
    </View>
  );

}
