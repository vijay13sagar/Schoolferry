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
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%",marginRight:50}}>
        <Text>Driver Name</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.driverName}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Driver Contact</Text></View>
      <View style={styles.details}>
        <Text>
        {route.params.driverContact}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Nanny Name</Text></View>
        <View style={styles.details}>
        <Text>
        {NID}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Nanny Contact</Text></View>
        <View style={styles.details}>
        <Text>
        {NPH}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Vehicle Number</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.vehicleRegNo}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Vehicle Type</Text></View>
        <View style={styles.details}>
        <Text>
        {route.params.vehicleType}
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Vehicle Moderl</Text></View>
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  details:{
    height: 40,
    backgroundColor: "#D3D3D3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#FF5C8D',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  details1:{
    height: 100,
    backgroundColor: "#D3D3D3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#FF5C8D',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#B0003A',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  inputViews: {
    height: 100,
    backgroundColor: "#D3D3D3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#FF5C8D',
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
    alignSelf:"flex-start",
    marginLeft:10,
    marginTop: 3,
  },
  error: {
      padding:1,
    color: '#DC143C',
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