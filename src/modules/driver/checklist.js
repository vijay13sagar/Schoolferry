import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, Alert, View } from "react-native";
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const today = new Date();
const TD = moment(today).format('DD-MM-YYYY');
const App = ({ route, navigation }) => {
  const [fuel, setfuel] = useState(false);
  const [engine, setengine] = useState(false);
  const [firstaid, setfirstaid] = useState(false);
  const [extinguisher, setextinguisher] = useState(false);
  const [tyre, settyre] = useState(false);
  const [isloading,setLoading] = useState(false)
  console.log("dsg", route.params.TripID);
  let tripid = route.params.TripID;
  let vehid = route.params.VehicleID;
useEffect(() => {
  fetch(`${Ngrok.url}/api/driver/getchecklist/${tripid}`, {
    "method": "GET",
    "headers": {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      setfuel(responseJson.fuel)
      settyre(responseJson.tyrePressure);
      setengine(responseJson.engine);
      setextinguisher(responseJson.extinguisher);
      setfirstaid(responseJson.firstAid)
    })
    .catch(err => {

    });
}, [])

  const pressHandler = () => {
    setLoading(true)
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
        setLoading(false)
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
      <Loader loading = {isloading}/>
      <Text style={{ alignSelf: "center" }}>{TD}</Text>
      <View style={{ alignItems: "flex-start", }}>
        <ScrollView style={{ alignSelf: "center", width: "100%" }}>
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

export default App;