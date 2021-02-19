
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
      <View style={styles.inputView}>
        <Text style={styles.TextInput}>
          
         Vehicle Number:- {route.params.item.regNo}
          
        </Text>
      </View>
      <View style={styles.inputView}>
       
        <Text style={styles.TextInput}>
          
          GPS Number:- {route.params.item.gps}
          
        </Text>
        
      </View>
      <View style={styles.inputView}>
       
       <Text style={styles.TextInput}>
         
         Model:- {route.params.item.model}
         
       </Text>
       
     </View>
      <View style={styles.inputView}>
      <Text style={styles.TextInput}>
          
         Capacity:- {route.params.item.capacity}
          
        </Text>
      </View>
     
      
      
        <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginText}>Daily Check List</Text>
            
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} >
            <Text style={styles.loginText}>Track Vehicle</Text>
            
            
        </TouchableOpacity>
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
    
      image: {
        marginBottom: 40,
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