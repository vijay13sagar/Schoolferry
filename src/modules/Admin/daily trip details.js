import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { set } from "react-native-reanimated";



export default function Trip_Details({ route, navigation }) {

  // const [pickerValue, setPickerValue] = useState("")
  // const [drivername, setdrivername] = useState("")
  // const [data, getData] = useState()
  // const [nanny, setNanny] = useState("");
  const s = route.params.item.trip_id
  let NID = null;
// let bf = false;
  //  useEffect(() => {

    
// // let responseJson = axios.get(`${Ngrok.url}/api/trip/child/age/${s}`) 
// // let value = responseJson.data.nannyRequired;
// // console.log("response",responseJson.data.nannyRequired);
// // // setNanny(responseJson.data.nannyRequired)


// // if(!value){
// // setNanny(false)
// // }
// // else{
// //   setNanny(true)
// // }
// // console.log("nanny",nanny);
      // fetch(`${Ngrok.url}/api/trip/child/age/${s}`, {
      //   "method": "GET",
      //   "headers": {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      // })
      //   .then(response => response.json())
      //   .then(responseJson => {
      //     console.log("cl", typeof(responseJson));
      //     console.log("cl", responseJson.nannyRequired);


      //     getData(responseJson)
      //     if(data == true){
      //       console.log("sai");
      //       bf=false
      //     }

      //     else{
      //       console.log("kumar");
      //     bf=true
      //     }
      //  console.log("nanny",bf);

      //   })
      //   .catch(err => {

      //   });
      // })
    

//   },[])
//   // const presshandler=() => {
//   //   fetch(`${Ngrok.url}/api/trip/child/age/${s}`, {
//   //     "method": "GET",
//   //     "headers": {
//   //       Accept: 'application/json',
//   //       'Content-Type': 'application/json'
//   //     },
//   //   })
//   //     .then(response => response.json())
//   //     .then(responseJson => {
//   //       console.log("cl", typeof (responseJson));
//   //       console.log("cl", responseJson.nannyRequired);


//   //       getData(responseJson)
//   //       console.log("nanny", data);

//   //     })
//   //     .catch(err => {

//   //     });

//   // }

  const nannyid = route.params.item.nanny_id
//let bd = false;

  if (nannyid == null) {
    NID = "no nanny provided"
    //  bd = true
  } else {
    NID = nannyid
  } 




  // console.log("item", data.nannyRequired);

  return (

    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />


        <View style={{ width: "70%" }}>
          <Text>Driver Name</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.driver_name}

          </Text>
        </View>

        <View style={{ width: "70%" }}>
          <Text>Vehicle Number</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.vehicle_regNo}

          </Text>
        </View>

        <View style={{ width: "70%" }}>
          <Text>Number of children</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.noOfChildren}

          </Text>
        </View>

        <View style={{ width: "70%" }}>
          <Text>Nanny ID</Text></View>

        <View style={styles.details}>

          <Text>

            {NID}

          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>Start Location</Text></View>
        <View style={styles.details1}>
          <Text>

            {route.params.item.address}

          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>End Location</Text></View>
        <View style={styles.details1}>
          <Text >

            {route.params.item.school}

          </Text>
        </View>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate("dailyChildtrip_list", { s: s })}>
          <Text style={styles.loginText}>Child List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate('freeDrivertrip_list', { s: s })} >
          <Text style={styles.loginText}>Change Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.loginBtns} onPress={() => navigation.navigate('freeNannytrip_list', { s: s })} >
          <Text style={styles.loginText}>Change Nanny</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate('freeVehicletrip_list', { s: s })} >
          <Text style={styles.loginText}>Change Vehicle</Text>
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
  loginBtn: {
    width: "40%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 170,
    backgroundColor: "#ff5c8d",
  },

  loginBtns: {
    width: "75%",
    borderRadius: 10,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,

    backgroundColor: "#ff5c8d",
  },
  disable: {
    width: "75%",
    borderRadius: 10,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,

    backgroundColor: "#c9adb6",
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
  details1: {
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
  Picker: {
    width: "75%",
    marginVertical: 10,
    borderRadius: 10,
    height: 30,
    borderWidth: 1,
    alignContent: "center",
    alignSelf: "center",

  },
  inputViews: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 100,
    alignItems: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
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
});