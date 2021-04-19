import React, { useState, useEffect } from "react";
import { Text, StatusBar, TouchableOpacity, Alert, View } from "react-native";
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import axios from 'axios';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';

const today = new Date();
const TD = moment(today).format('DD-MM-YYYY');
const App = ({ route, navigation }) => {
  const [fuel, setfuel] = useState(false);
  const [engine, setengine] = useState(false);
  const [firstaid, setfirstaid] = useState(false);
  const [extinguisher, setextinguisher] = useState(false);
  const [tyre, settyre] = useState(false);
  const [isloading,setLoading] = useState(false)
  let tripid = route.params.TripID;
  let vehid = route.params.VehicleID;
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()


useEffect(() => {
  axios
    .get(`${Ngrok.url}/api/driver/getchecklist/${tripid}`)
    .then(function (response) {
      setfuel(response.data.fuel)
      settyre(response.data.tyrePressure);
      setengine(response.data.engine);
      setextinguisher(response.data.extinguisher);
      setfirstaid(response.data.firstAid)
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
    });
}, [])

  const pressHandler = () => {
    setLoading(true)
    try {
      axios
        .post(`${Ngrok.url}/api/driver/checklist`, {
          vehicleno: vehid,
        tripid: tripid,
        fuel: fuel,
        engine: engine,
        tyre: tyre,
        firstaid: firstaid,
        extinguisher: extinguisher,
        })
        .then(function (response) {
          
          setLoading(false)
        if (response.data.message == "checklist updated successfully") {         
          setToast(true)
          SetMessage(ToastMessage.drivecheck)
        } else {
          Alert.alert('Try again!')
        }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    setToast(false)
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      <Loader loading = {isloading}/>
      {showtoast? (<ToastComponent type = {ToastMessage.success}  message = {message}/>): null}
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