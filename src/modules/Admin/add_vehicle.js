

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
 
export default function Add_Driver() {
  const [VH, setVH] = useState("");
  const [Gps, setGps] = useState("");
  const [Model, setModel] = useState("");
  const [Cap, setCap] = useState("");
  const [Type, setType] = useState();
  const [{ emptyFields }, setemptyFeilds] = useState("");
  const validateEmail = (email) => {
    const regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (regex_mail.test(email)) {
        return true
    }
  };

  // const validatecontact = (contact) => {
    
  //     var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/
  
  //   if (regex_phone.test(contact)) {
  //     return true
  //   }
  //   else{return false}

  // };

  const validateFunction = () => {
    
    if (!VH||!Gps || !Model || !Type|| !Cap ) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
       return false
    }
    
    return true
    
  }

    function  pressHandler() {
      console.log("validation",typeof(Number(Type)))
      if (validateFunction()) {
   
      console.log("apistarts")
    
    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/admin/register/vehicle`,
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
              regno: VH,
              capacity:Number(Cap),
              gps:Gps,
              type:Type,
              model:Model

        }
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert('Registration Successful')
          }

          console.log("response", response.status);
        })
        .catch(function (error) {
          console.log(error.response.status) // 401
          console.log(error.response.data.error) //Please Authenticate or whatever returned from server
        if(error.response.status==401){
          //redirect to login
          Alert.alert('Phone Number Alredy Exist!')
        }
     
        })
      // .catch(function (error) {
      //   // handle error
      //   console.log("errordetails",error);
      // })
    }
       catch(error){
        console.log("errordetails",error);
       }
     }
   }
  
 
   return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Vehicle Number"
          placeholderTextColor="#929292"
          onChangeText={(VH) => setVH(VH)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter GPS Tracking Number"
          placeholderTextColor="#929292"
          onChangeText={(Gps) => setGps(Gps)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Type"
          placeholderTextColor="#929292"
          onChangeText={(Type) => setType(Type)}
        />
      </View>
       <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Model"
          placeholderTextColor="#929292"
          onChangeText={(Model) => setModel(Model)}
        />
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Capacity"
          placeholderTextColor="#929292"
          onChangeText={(Cap) => setCap(Cap)}
        />
      </View>
     
      <Text style={styles.error}>{emptyFields}</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={pressHandler}>
            <Text style={styles.loginText}>Register</Text>
          
            
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
        
        
        backgroundColor:"#fff",   //"#C4C4C4",
        marginTop: 5,
        //opacity: 0.5,
      },
    
       TextInput: {
        height: 50,
       marginLeft:30,
      
    
      },
    
      forgot_button: {
        height: 30,
        marginBottom: 15,
        color: '#1e90ff',
    
      },
      error: {
        padding:1,
  
      color: '#dc143c',
      fontSize: 11,
      alignItems: 'flex-start',
      justifyContent: 'center'
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