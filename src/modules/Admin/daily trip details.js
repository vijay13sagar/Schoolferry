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

import { Picker } from '@react-native-picker/picker';


export default function Trip_Details({ route, navigation }){
  
  const [pickerValue, setPickerValue] = useState("")

  console.log("this.props",route.params.item.releaseYear);

  
 

  return (
    
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%"}}>
        <Text>Driver Name</Text></View> 
        
      <View style={styles.details}>
        <Text>
          
          {route.params.item.driver_name}
         
        </Text>
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Vehicle Number</Text></View> 
      
        <View style={styles.details}>
        <Text>
          
         {route.params.item.vehicle_regNo}
         
        </Text>
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Number of children</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.noOfChildren}
         
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Nanny ID</Text></View> 
     
        <View style={styles.details}>
        <Text>
          
          {route.params.item.nanny_id}
         
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Start Location</Text></View> 
        <View style={styles.details}>
        <Text>
          
         {route.params.item.address}
         
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>End Location</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.school}
         
        </Text>
      </View>
      <Picker
      selectedValue={pickerValue}
          style={styles.Picker}
          
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Driver" value="Trip1" />
          <Picker.Item label="Driver 1" value="Driver 1" />
        </Picker>
        <Picker
      selectedValue={pickerValue}
          style={styles.Picker}
          
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Vehicle" value="Trip1" />
          <Picker.Item label="Vehicle     12" value="Driver 1" />
        </Picker>
        <Picker
      selectedValue={pickerValue}
          style={styles.Picker}
          
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Nanny" value="Trip1" />
          <Picker.Item label="Nanny 1" value="Driver 1" />
        </Picker>
      {/* <View style={{width:"70%"}}>
        <Text></Text></View> 
        <View style={styles.inputView}>
        <Text>
          
          value={route.params.item.title}
         
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Subscription Details</Text></View> 
      <View style={styles.inputViews}>
      <Text  style={styles.subText}>Start Date:-</Text>
      <Text  style={styles.subText}>End Date:-</Text>
      <Text  style={styles.subText}>Tenure:-</Text>
      <Text  style={styles.subText}>Subscription ID:-</Text>
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
    width:"75%",
    marginVertical:10,
    borderRadius:10,
    height:30,
    borderWidth:1,
    alignContent:"center",
    alignSelf:"center",
    
 },
  inputViews: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 100,
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
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
    alignSelf:"flex-start",
    marginLeft:10,
    marginTop: 3,
    
  

  },
  error: {
      padding:1,

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