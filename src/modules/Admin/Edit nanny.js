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


export default function Edit_Nanny({ route, navigation }) {
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;

  let nannyid = route.params.item.id;


  const pressHandler = () => {
    setLoading(true);
    axios
      .post(`${Ngrok.url}/api/admin/trips/nanny/new`, {
        nannyid: nannyid,
        tripid: c
      })
      .then(function (response) {

        setLoading(false);

        if (response.data.message == "nanny changed") {
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
          <Text>Name</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.name}

          </Text>
        </View>
        <View style={{ width: "70%", marginLeft: 35 }}>
          <Text>Contact Number</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.contact}

          </Text>
        </View>

        <View style={{ width: "70%", marginLeft: 35 }}>
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
