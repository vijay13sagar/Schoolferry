import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { event } from "react-native-reanimated";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'



export default function Edit_Nanny({ route,navigation }) {
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;
  console.log("sfsdffasdas", c);
  let nannyid = route.params.item.id;
  console.log("apistarts", nannyid)

  const pressHandler = () => {
    setLoading(true);
    fetch(`${Ngrok.url}/api/admin/trips/nanny/new`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nannyid : nannyid,
             tripid : c
    
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        console.log(responseJson);
        if (responseJson.message == "nanny changed") {
          Alert.alert('Changed Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page')}])
        } else {
          Alert.alert('Try again!')
        }
        //alert(JSON.stringify(response))
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  

}


return (
<View style={styles.container1}>
  <ScrollView>
     <Loader loading={isloading} />
    
      <StatusBar style="auto" />
      <View style={{ width: "70%",marginLeft: 35 ,marginTop:40}}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.name}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35}}>
        <Text>Contact Number</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.contact}

        </Text>
      </View>

      <View style={{ width: "70%", marginLeft: 35}}>
        <Text>Nanny ID</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.id}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.TextInput}>Assign Nanny</Text>
      </TouchableOpacity>

    
  </ScrollView>
  </View>

);

}
