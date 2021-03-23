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
import { event } from "react-native-reanimated";


export default function nanny_Details({ route, navigation }){
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  
  console.log("this.props",route.params.item.releaseYear);
 
 
  return (
    

    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <TouchableOpacity style={styles.editBtn}  >
        <Text style={{alignSelf:"center", marginTop: 8,}}>Edit</Text>

      </TouchableOpacity>  */}
        <View style={{marginRight:280}}>
        <Text>Name</Text></View> 
        
        <View style={styles. details}>
        <Text>
          
          {route.params.item.name}
          
          </Text>
      </View>
     
      {/* <View style={{width:"70%"}}>
        <Text>Email ID</Text></View> 
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View> */}
     
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
      <View style={{marginRight:225}}>
        <Text>Vehicle Number</Text></View> 
        <View style={styles. details}>
        <Text>
          
          AP31ER2558
          
          </Text>
      </View>
     
      {/* <View style={{width:"70%"}}>
        <Text>ID Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#929292"
          onChangeText={(LIC) => setLIC(LIC)}
        />
      </View> */}
      

     
      {/* <TouchableOpacity style={styles.loginBtn}  >
        <Text style={styles.loginText}>De-Activate</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}  >
        <Text style={styles.loginText}>Statistics</Text>

      </TouchableOpacity> */}
     

    </View>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    
  },
  editBtn: {
    width: "20%",
    borderRadius: 10,
    height: 38,
    alignSelf:"flex-end",
    backgroundColor: "#ff5c8d",
   marginRight:20,
    marginTop: 20,
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