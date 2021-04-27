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
import * as ToastMessage from '../../constants/ToastMessages';


export default function Edit_Vehicle({ route, navigation }) {
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;

  let vehicleid = route.params.item.id;


  const pressHandler = () => {
    setLoading(true);
    axios
      .post(`${Ngrok.url}/api/admin/trips/vehicle/new`, {
        vehicleid: vehicleid,
        tripid: c
      })
      .then(function (response) {

        setLoading(false);

        if (response.data.message == "vehicle changed") {
          Alert.alert('Changed Successfully', '', [{ text: 'Proceed', onPress: () => navigation.navigate('Home_page') }])
        } else {

          setToast(true)
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setToast(true)
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
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Capacity</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.capacity}

          </Text>
        </View>

        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Type</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.type}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
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
