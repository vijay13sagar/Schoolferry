import React, { useState } from "react";
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
import { event } from "react-native-reanimated";
import styles from '../../components/style';

export default function Trip_Details({ route }){
console.log("data",route.params);
const nannyid = route.params.nannyName
let NID = null
let NPH = null
//let bd = false;
  if (nannyid == null) {
    NID = "no nanny provided"
    NPH = "no nanny provided"
    //  bd = true
  } else {
    NID = nannyid
    NPH = route.params.nannyContact
  }
  return (
    // <ScrollView>
    <View style={styles.cont }>
      <StatusBar style="auto" />
        <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Driver Name</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.driverName}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Driver Contact</Text></View>
      <View style={styles.details}>
        <Text>
        {route.params.driverContact}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Nanny Name</Text></View>
        <View style={styles.details}>
        <Text>
        {NID}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Nanny Contact</Text></View>
        <View style={styles.details}>
        <Text>
        {NPH}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Vehicle Number</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.vehicleRegNo}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Vehicle Type</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.vehicleType}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text style={styles.headertext}>Vehicle Model</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.vehicleModel}
        </Text>
      </View>
      {/* <View style={{width:"70%",marginRight:50}}>
        <Text>Vehicle Number</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.item.school}
        </Text>
      </View> */}
      {/* <View style={{width:"70%",marginRight:50}}>
        <Text>Subscription Details</Text></View>
      <View style={styles.inputViews}>
      <Text  style={styles.subText}>Start Date:- {route.params.item.subscription.startDate} </Text>
      <Text  style={styles.subText}>End Date:- {route.params.item.subscription.endDate} </Text>
      <Text  style={styles.subText}>Tenure:- {route.params.item.subscription.tenure} </Text>
      <Text  style={styles.subText}>Cost:- {route.params.item.subscription.cost} </Text>
      {/* <Text  style={styles.subText}>Subscription ID:-{route.params.item.school} </Text>
      </View> */}
    </View>
    // </ScrollView>
  );
}