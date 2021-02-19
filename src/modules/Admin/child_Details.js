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
  const [sch, setsch] = useState("");
  const [name, setname] = useState("");
  const [BG, setBG] = useState("");
  const [age, setage] = useState("");
  const [PL, setPL] = useState("");
  const [{ VID }, setVID] = useState("");
  const [{ DPL }, setDPL] = useState("");
  const [{ SD }, setSD] = useState("");

  console.log("this.props",route.params.item.releaseYear);

  
 
  // const pressHandler = () => {
  //   if (validateFunction()) {
  //     /* const body = {
  //        id: email,
  //         password: password
  //      }*/
  //     /*let response = await loginApi(body)*/
  //   fetch("http://eccff4463173.ngrok.io/api/parent/signup", {
  //     "method": "POST",
  //     "headers": {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       firstName: FN,
  //       lastName:LN ,
  //       email: email,
  //       contact: contact,
  //       password: password
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       if (responseJson.message == "registered successfully") {
  //         alert ('Congratulations..Sign Up Successful')
  //       }else {
  //         alert('sign up failed')
  //       }
  //       //alert(JSON.stringify(response))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  //  }
  return (
    
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%"}}>
        <Text>Name</Text></View> 
        
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>school</Text></View> 
      
      <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Age</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Blood Group</Text></View> 
     
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Pickup Location</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Drop Location</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>

      <View style={{width:"70%"}}>
        <Text>Vehicle Number</Text></View> 
        <View style={styles.details}>
        <Text>
          
          {route.params.item.releaseYear}
          
        </Text>
      </View>
      <View style={{width:"70%"}}>
        <Text>Subscription Details</Text></View> 
      <View style={styles.inputViews}>
      <Text  style={styles.subText}>Start Date:-</Text>
      <Text  style={styles.subText}>End Date:-</Text>
      <Text  style={styles.subText}>Tenure:-</Text>
      <Text  style={styles.subText}>Subscription ID:-</Text>
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