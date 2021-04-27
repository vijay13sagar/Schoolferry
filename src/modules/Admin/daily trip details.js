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

import styles from '../../components/styles_admin';




export default function Trip_Details({ route, navigation }) {


  const s = route.params.item.trip_id
  let NID = null;



  const nannyid = route.params.item.nanny_id


  if (nannyid == null) {
    NID = "no nanny provided"

  } else {
    NID = nannyid
  }






  return (

    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />


        <View style={{ marginRight: 240, marginTop: 50, }}>
          <Text>Driver Name</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.driver_name}

          </Text>
        </View>

        <View style={{ marginRight: 230 }}>
          <Text>Vehicle Number</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.vehicle_regNo}

          </Text>
        </View>

        <View style={{ marginRight: 210 }}>
          <Text>Number of children</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.noOfChildren}

          </Text>
        </View>

        <View style={{ marginRight: 260 }}>
          <Text>Nanny ID</Text></View>

        <View style={styles.details}>

          <Text>

            {NID}

          </Text>
        </View>
        <View style={{ marginRight: 240 }}>
          <Text>Start Location</Text></View>
        <View style={styles.details}>
          <Text>

            {route.params.item.address}

          </Text>
        </View>
        <View style={{ marginRight: 240 }}>
          <Text>End Location</Text></View>
        <View style={styles.details}>
          <Text >

            {route.params.item.school}

          </Text>
        </View>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate("dailyChildtrip_list", { s: s })}>
          <Text style={styles.TextInput}>Child List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate('freeDrivertrip_list', { s: s })} >
          <Text style={styles.TextInput}>Change Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate('freeNannytrip_list', { s: s })} >
          <Text style={styles.TextInput}>Change Nanny</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtns} onPress={() => navigation.navigate('freeVehicletrip_list', { s: s })} >
          <Text style={styles.TextInput}>Change Vehicle</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>

  );

}
