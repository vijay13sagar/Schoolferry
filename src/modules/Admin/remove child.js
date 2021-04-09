import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Alert,
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



export default function remove_Child({ route,navigation }) {
  const [isloading, setLoading] = useState(false);
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  let c = route.params.tripid;
  console.log("sfsdffasdas", c);
  let childid = route.params.item.childId;
  console.log("apistarts", childid)

  const pressHandler = () => {

    setLoading(true);
    fetch(`${Ngrok.url}/api/admin/trips/child/remove`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        childid : childid,
             tripid : c
    
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.message == "child removed from the trip") {
          Alert.alert('Removed Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page')}])
        } else {
          setLoading(false);
          //Alert.alert('Try again!')
          setToast(true)
        }
        //alert(JSON.stringify(response))
      })
      .catch(err => {
        setLoading(false);
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
      <View style={{ width: "70%",  marginLeft: 35,marginTop:40 }}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.childName}

        </Text>
      </View>
      <View style={{ width: "70%",  marginLeft: 35}}>
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
      <View style={{ width: "70%", marginLeft: 35 }}>
        <Text>Blood Group</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.bloodGroup}

        </Text>
      </View>
      <View style={{ width: "70%",  marginLeft: 35 }}>
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
        <Text style={styles.TextInput}>Remove Child</Text>
      </TouchableOpacity>

   
  </ScrollView>
</View>
);

}
