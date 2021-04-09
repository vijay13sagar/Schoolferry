
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from '../../components/styles_admin'
 
export default function vehicle_Details({ route, navigation }){


  console.log("this.props",route.params.item.releaseYear);
  return (
    <View style={styles.container2}>
       <View style={{marginRight:225,marginTop:40,}}>
        <Text>Vehicle Number</Text></View> 
      <View style={styles. details}>
        <Text >
          
         {route.params.item.regNo}
          
        </Text>
      </View>
      <View style={{marginRight:245}}>
        <Text>GPS Number</Text></View> 
      <View style={styles. details}>
       
        <Text >
          
           {route.params.item.gps}
          
        </Text>
       
        
      </View>
      <View style={{marginRight:285}}>
        <Text>Type</Text></View> 
      <View style={styles. details}>
      <Text>
          
          {route.params.item.type}
          
        </Text>
      </View>
      <View style={{marginRight:285}}>
        <Text>Model</Text></View> 
      <View style={styles. details}>
       
       <Text>
         
        {route.params.item.model}
         
       </Text>
       
     </View>
     <View style={{marginRight:275}}>
        <Text>Capacity</Text></View> 
      <View style={styles. details}>
      <Text >
          
          {route.params.item.capacity}
          
        </Text>
      </View>
      </View>
  );
}
 
