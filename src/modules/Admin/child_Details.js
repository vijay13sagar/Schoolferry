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


export default function child_Details({ route, navigation }){
 
 

  
 
  
  return (
    
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%",marginRight:50}}>
        <Text>Name</Text></View> 
        
        <View style={styles.details}>
        <Text>
          
          {route.params.item.childName}
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>school</Text></View> 
      
      <View style={styles.details1}>
        <Text>
          
        {route.params.item.school}
          
        </Text>
      </View>
     
      <View style={{width:"70%",marginRight:50}}>
        <Text>Age</Text></View> 
        <View style={styles.details}>
        <Text>
          
        {route.params.item.age}
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Blood Group</Text></View> 
     
        <View style={styles.details}>
        <Text>
          
        {route.params.item.bloodGroup}
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Pickup Location</Text></View> 
        <View style={styles.details1}>
        <Text>
          
        {route.params.item.address} 
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Drop Location</Text></View> 
        <View style={styles.details1}>
        <Text>
        {route.params.item.school}  
         
        </Text>
      </View>

      {/* <View style={{width:"70%",marginRight:50}}>
        <Text>Vehicle Number</Text></View> 
        <View style={styles.details}>
        <Text>
          
        {route.params.item.school}
          
        </Text>
      </View> */}
      <View style={{width:"70%",marginRight:50}}>
        <Text>Subscription Details</Text></View> 
      <View style={styles.inputViews}>
      <Text  style={styles.subText}>Start Date:- {route.params.item.subscription.startDate} </Text>
      <Text  style={styles.subText}>End Date:- {route.params.item.subscription.endDate} </Text>
      <Text  style={styles.subText}>Tenure:- {route.params.item.subscription.tenure} </Text>
      <Text  style={styles.subText}>Cost:- {route.params.item.subscription.cost} </Text>
      {/* <Text  style={styles.subText}>Subscription ID:-{route.params.item.school} </Text> */}
      </View>

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
    
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },
  details1:{
    
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
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
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
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