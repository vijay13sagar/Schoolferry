import React, { useState, useEffect } from "react";
import { CheckBox, Text, StyleSheet, TextInput, TouchableOpacity, Alert, View } from "react-native";
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';

const today = new Date();
const TD = moment(today).format('DD-MM-YYYY');

const App = ({ route, navigation }) => {
  const [fuel, setfuel] = useState(false);
  const [engine, setengine] = useState(false);
  const [firstaid, setfirstaid] = useState(false);
  const [extinguisher, setextinguisher] = useState(false);
  // const [cleanliness, setcleanliness] = useState(false);
  // const [brake, setbrake] = useState(false);
  const [data, getData] = useState()
  const [tyre, settyre] = useState(false);
  console.log("dsg", route.params.TripID);
  let tripid = route.params.TripID;
  let vehid = route.params.VehicleID;
//   // const [VN, setVN] = useState("");
//   useEffect(() => {
// console.log("ddddddddddddddddddd");
//     fetch(`${Ngrok.url}/api/driver/getchecklist/${tripid}`, {
//       "method": "GET",
//       "headers": {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     })
//       .then(response => response.json())
//       .then(responseJson => {

//         console.log("cl", responseJson);

        
//         getData(responseJson)

//       })
//       .catch(err => {

//       });
//   })

  const pressHandler = () => {
    fetch(`${Ngrok.url}/api/driver/checklist`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vehicleno: vehid,
        tripid: tripid,
        fuel: fuel,
        engine: engine,
        tyre: tyre,
        firstaid: firstaid,
        extinguisher: extinguisher,

      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.message == "checklist updated successfully") {
          Alert.alert('Checklist Updated','', [{text: 'Proceed', onPress:() => navigation.navigate('Trip Details',)}])
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
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>{TD}</Text>
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Vehicle Number"
          placeholderTextColor="#929292"
          onChangeText={(VN) => setVN(VN)}
        />
      </View> */}
      <View style={{ alignItems: "flex-start", }}>
        <ScrollView style={{ alignSelf: "center", width: "100%" }}>

          {/* <View style={styles.pendingTrips}>
      <Text style={{marginLeft:35,fontSize: 25,
    marginVertical: 10,
    fontWeight: "bold"}}>Vehicle Details</Text>
      <Text  style={styles.subText}>Vehicle Number :</Text>
      <Text  style={styles.subText}>Vehicle Type :</Text>
      <Text  style={styles.subText}>Vehicle Capacity :</Text>
      </View> */}
          <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 20, }}> Daily Routine Checklist</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={fuel}
              onValueChange={setfuel}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Fuel Quantity</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={engine}
              onValueChange={setengine}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Engine Condition</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={firstaid}
              onValueChange={setfirstaid}
              style={styles.checkbox}
            />
            <Text style={styles.label}>First AID</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={extinguisher}
              onValueChange={setextinguisher}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Extinguisher</Text>
          </View>
          {/* <View style={styles.checkboxContainer}>
        <CheckBox
          value={cleanliness}
          onValueChange={setcleanliness}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Cleanliness</Text>
      </View> */}
          {/* <View style={styles.checkboxContainer}>
        <CheckBox
          value={brake}
          onValueChange={setbrake}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Brakes</Text>
      </View> */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={tyre}
              onValueChange={settyre}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Tyre Pressure</Text>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
            <Text style={styles.loginText}>Submit</Text>

          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F9F2F2",
  },
  sidehead: {
    fontWeight: 'bold',
    marginLeft: 8,
    alignSelf: 'flex-start',
    justifyContent: 'space-around'
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
  pendingTrips: {
    backgroundColor: "#fff",
    height: 140,
    marginTop: 50,
    width: '90%',
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignSelf: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 20,
    //opacity: 0.5,
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 30
  },
  subText: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 3,
  },
  inputViews: {
    height: 100,
    backgroundColor: "#D3D3D3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#FF5C8D',
    //marginTop: 3,
    width: '85%',
    alignSelf: "center", marginTop: 40,
    padding: 8,

  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
export default App;