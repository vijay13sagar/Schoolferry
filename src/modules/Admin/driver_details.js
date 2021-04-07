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
import styles from '../../components/styles_admin'


export default function driver_Details({ route, navigation }){
 
  
  console.log("this.props",route.params.item.releaseYear);
  return (
    
    
    <View style={styles.container2}>
      <StatusBar style="auto" />
      
        <View style={{marginRight:285,marginTop:40}}>
        <Text>Name</Text></View> 
        
      <View style={styles. details}>
        <Text>
          
          {route.params.item.name}
          
          </Text>
      </View>
     
      <View style={{marginRight:230}}>
        <Text>Phone Number</Text></View> 
        
        <View style={styles. details}>
        <Text>
          
          {route.params.item.contact}
          
          </Text>
      </View>
     
      <View style={{marginRight:265}}>
        <Text>Address</Text></View> 
     
       
        <View style={styles. details}>
        <Text>
          
          {route.params.item.address}
          
          </Text>
      </View>
     
    
      <View style={{marginRight:250}}>
        <Text>Experience</Text></View> 
       
        <View style={styles. details}>
        <Text>
          
          {route.params.item.experience}
          
          </Text>
      </View>
    </View>
    

  );

}
