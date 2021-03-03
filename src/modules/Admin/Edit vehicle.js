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


export default function Edit_Vehicle({ route }) {

  let c = route.params.tripid1;
  console.log("sfsdffasdas", c);
  let vehicleid = route.params.item.id;
  console.log("apistarts",vehicleid)

  const pressHandler = () => {

    // try {
    //   axios({
    //     method: 'POST',
    //     url: `${Ngrok.url}/api/admin/trips/child/remove`,
    //     "headers": {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       childid : childid,
    //       tripid : c

    //     }
    //   })
    //     .then(function (response) {
    //       if (response.status == 200) {
    //         Alert.alert('Removed Successfully')
    //       }

    //       console.log("response", response.status);
    //     })
    //     .catch(function (error) {
    //       //Please Authenticate or whatever returned from server
    //     if(error.status == 401){
    //       //redirect to login
    //       Alert.alert('Try again!')
    //     }

    //     })
    //   // .catch(function (error) {
    //   //   // handle error
    //   //   console.log("errordetails",error);
    //   // })
    // }
    //    catch(error){
    //     console.log("errordetails",error);
    //    }
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
        console.log(responseJson);
        if (responseJson.message == "vehicle changed") {
          Alert.alert('Changed Successfully')
        } else {
          Alert.alert('Try again!')
        }
        //alert(JSON.stringify(response))
      })
      .catch(err => {
        console.log(err);
      });
  

}


return (

  <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>Vehicle ID</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.id}

        </Text>
      </View>
      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>Vehicle NO</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.regNo}

        </Text>
      </View>
      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>Capacity</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.capacity}

        </Text>
      </View>

      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>Type</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.type}

        </Text>
      </View>
      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>Model</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.model}

        </Text>
      </View>
      <View style={{ width: "70%", marginRight: 50 }}>
        <Text>GPS NO</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.gps}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.loginText}>Assign Vehicle</Text>
      </TouchableOpacity>

    </View>
  </ScrollView>

);

}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },
  details: {
    height: 40,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

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
  inputViews: {

    height: 100,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },

  TextInput: {
    width: "70%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 2,

  },
  subText: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 3,



  },

  error: {
    padding: 1,

    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    backgroundColor: "#ff5c8d",
  },
});