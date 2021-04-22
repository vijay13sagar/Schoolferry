import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loader from '../../components/Loader';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';

import axios from 'axios';

export default function add_Child({ route,navigation}) {
  const [isloading, setLoading] = useState(false);
  const [showtoast,setToast] = useState(false)
  let c = route.params.tripid1;
  let childid = route.params.item.childId;
let age = route.params.item.age
  const pressHandler = () => {
    setLoading(true);
    axios
    .post(`${Ngrok.url}/api/admin/trips/child/add`, {
      childid : childid,
              tripid : c
    })
    .then(function (response) {
      setLoading(false);
       
              if (response.data.message == "child added") {
               Alert. alert('Added Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page',)}])
              } else {
              setToast(true)
              }   
      
    
    })
    .catch(function (error) {
      console.log(error);
    });

//     fetch(`${Ngrok.url}/api/admin/trips/child/add`, {
//       "method": "POST",
//       "headers": {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         childid : childid,
//              tripid : c
    
//       })
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         setLoading(false);
       
//         if (responseJson.message == "child added") {
//          Alert. alert('Added Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page',)}])
//         } else {
//         setToast(true)
//         }
//       })
//       .catch(err => {
//         setLoading(false);
      
//       });
  
      setToast(false)
}


return (
  <View style={styles.container1}>
    {showtoast? (<ToastComponent type = {ToastMessage.failure}  message = {ToastMessage.message5}/>): null}
  <ScrollView>
    <Loader loading={isloading} />
   
      <StatusBar style="auto" />
      <View style={{ width: "70%",  marginLeft: 35 }}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.childName}

        </Text>
      </View>
      <View style={{ width: "70%",  marginLeft: 35 }}>
        <Text>Parent Contact Number</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.parentsContact}

        </Text>
      </View>

      <View style={{ width: "70%",  marginLeft: 35 }}>
        <Text>Age</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.age}

        </Text>
      </View>
      <View style={{ width: "70%",  marginLeft: 35}}>
        <Text>Blood Group</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.bloodGroup}

        </Text>
      </View>
      <View style={{ width: "70%",marginLeft: 35 }}>
        <Text>Pickup Location</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.address}

        </Text>
      </View>
      <View style={{ width: "70%",  marginLeft: 35 }}>
        <Text>Drop Location</Text></View>
      <View style={styles.details}>
        <Text>
          {route.params.item.school}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.TextInput}>Add Child</Text>
      </TouchableOpacity>

   
  </ScrollView>
  </View>
);
}