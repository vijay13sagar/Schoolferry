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


export default function driver_Details({ route, navigation }){
  const [email, setEmail] = useState(route.params.item.releaseYear);
  const [name, setname] = useState(route.params.item.title);
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  const [{ EXP }, setEXP] = useState("");
  
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
      {/* <TouchableOpacity style={styles.editBtn}  >
        <Text style={{alignSelf:"center", marginTop: 8,}}>Edit</Text>

      </TouchableOpacity>  */}
        <View style={{marginRight:285}}>
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
     
      <View style={{marginRight:225}}>
        <Text>Vehicle Number</Text></View> 
        
        <View style={styles. details}>
        <Text>
          
          AP31ER2558
          
          </Text>
      </View>
     
      <View style={{marginRight:250}}>
        <Text>Experience</Text></View> 
       
        <View style={styles. details}>
        <Text>
          
          {route.params.item.experience}
          
          </Text>
      </View>
     

      {/* <View style={{width:"70%"}}>
        <Text>Licence Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          
          placeholderTextColor="#929292"
          secureTextEntry={true}
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
  editBtn: {
    width: "20%",
    borderRadius: 10,
    height: 38,
    alignSelf:"flex-end",
    backgroundColor: "#ff5c8d",
   marginRight:20,
    marginTop: 20,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});