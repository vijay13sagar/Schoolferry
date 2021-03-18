
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
 
export default function vehicle_Details({ route, navigation }){


  console.log("this.props",route.params.item.releaseYear);
  return (
    <View style={styles.container}>
       <View style={{marginRight:30,width:"70%"}}>
        <Text>Vehicle Number</Text></View> 
      <View style={styles. details}>
        <Text >
          
         {route.params.item.regNo}
          
        </Text>
      </View>
      <View style={{marginRight:30,width:"70%"}}>
        <Text>GPS Number</Text></View> 
      <View style={styles. details}>
       
        <Text >
          
           {route.params.item.gps}
          
        </Text>
       
        
      </View>
      <View style={{marginRight:30,width:"70%"}}>
        <Text>Type</Text></View> 
      <View style={styles. details}>
      <Text>
          
          {route.params.item.type}
          
        </Text>
      </View>
      <View style={{marginRight:30,width:"70%"}}>
        <Text>Model</Text></View> 
      <View style={styles. details}>
       
       <Text>
         
        {route.params.item.model}
         
       </Text>
       
     </View>
     <View style={{marginRight:30,width:"70%"}}>
        <Text>Capacity</Text></View> 
      <View style={styles. details}>
      <Text >
          
          {route.params.item.capacity}
          
        </Text>
      </View>
      
      
     
      
      
        {/* <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginText}>Daily Check List</Text>
            
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginText}>Track Vehicle</Text>
            
            
        </TouchableOpacity> */}
      </View>
  );
}
 
const styles = StyleSheet.create({
    container: {
      padding: 50,
      flex:1,
        backgroundColor: "#F9F2F2",
        alignItems: "center",
        
      },
    
      
      
      details:{
        height: 40,
        backgroundColor: "#d3d3d3",
        //borderWidth: 1,
        borderRadius: 12,
        //borderColor: '#ff5c8d',
        width: '85%',
        padding: 8,
        alignSelf: "center"
    
      },
    
      TextInput: {
        height: 50,
        alignItems:"flex-start",
        padding: 10,
        marginLeft:10,
    
      },
    
      forgot_button: {
        height: 30,
        marginBottom: 15,
        color: '#1e90ff',
    
      },
    
      loginBtn: {
        width: "50%",
        borderRadius: 10,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff5c8d",
        alignSelf: "center",
        marginTop: 20,
      },
  
});