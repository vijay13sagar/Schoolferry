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


export default function user_Details({ route, navigation }){
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  const [{ EXP }, setEXP] = useState("");
  
  console.log("this.props",route.params.item);

  
 

  return (
    
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%"}}>
        <Text>Name</Text></View> 
        
      <View style={styles.inputView}>
      <Text style={styles.TextInput}>
          
          {route.params.item.name}
          
        </Text>
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Email ID</Text></View> 
      
      <View style={styles.inputView}>
      <Text style={styles.TextInput}>
          
          {route.params.item.email}
          
        </Text>
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Phone Number</Text></View> 
      <View style={styles.inputView}>
      <Text style={styles.TextInput}>
          
          {route.params.item.contact}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Address</Text></View> 
     
      <View style={styles.inputView}>
      <Text style={styles.TextInput}>
          
          {route.params.item.address}
          
        </Text>
      </View>
      
      <TouchableOpacity style={styles.loginBtn} onPress = {()=>navigation.navigate('userSubscription')}  >
        <Text style={styles.loginText}>Child Details</Text>

      </TouchableOpacity> 

    </View>
    </ScrollView>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
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
    width: "70%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 2,

  },
  error: {
      padding:1,

    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
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
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});