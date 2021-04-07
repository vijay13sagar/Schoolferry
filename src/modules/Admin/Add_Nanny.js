

import React, { useState } from "react";
import {
  
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  
} from "react-native";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin';
 
export default function Add_Nanny({navigation}) {
  const [isloading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [contact, setcontact] = useState("");
  const [ADR, setADR] = useState("");
  
  const [EXP, setEXP] = useState("");
  const [{ emailError }, setEmailError] = useState("");
  const [{ contactError }, setcontactError] = useState("");
  const [{ emptyFields }, setemptyFeilds] = useState("");
  const validateEmail = (email) => {
    const regex_mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (regex_mail.test(email)) {
        return true
    }
  };

  const validatecontact = (contact) => {
    
      var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/
  
    if (regex_phone.test(contact)) {
      return true
    }
    else{return false}

  };

  const validateFunction = () => {
    
    if (!name || !contact || !ADR ||  !password) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
      setcontactError({contactError:null})
      setEmailError({ emailError: null })
      return false
    }
    
    else if (!validatecontact(contact)) {
      setcontactError({ contactError: "Enter Valid Phone Number" })
      setEmailError({ emailError: null })
      setemptyFeilds({ emptyFields: null })
      return false
    }
   
    return true
    
  }

    function  pressHandler() {
      console.log("validation",validateFunction())
      if (validateFunction()) {
   
      console.log("apistarts")
    
    try {
      setLoading(true);

      axios({
        
        method: 'POST',
        url: `${Ngrok.url}/api/admin/register/nanny`,
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          name: name,
              email: email,
              contact: contact,
              address:ADR,
              experience:EXP,
              photourl:"NULL",
              idproofurl:"NULL",
              password:password
           

        }
      })
      .then(function (response) {
        setLoading(false);
        if (response.status == 200) {
          Alert.alert('Registration Successful','', [{text: 'Proceed', onPress:() => navigation.navigate('Employee',)}])
        }

        console.log("response", response.status);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response.status) // 401
        console.log(error.response.data.error) //Please Authenticate or whatever returned from server
      if(error.response.status == 401){
        //redirect to login
        Alert.alert('Phone Number Alredy Exist!')
        setLoading(false);
      }
   
      })
    }
       catch(error){
        setLoading(false);
        console.log("errordetails",error);
       }
     }
   }
  
 
  return (
    <View style={styles.container}>
      <Loader loading={isloading} />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput1}
          placeholder="Name"
          placeholderTextColor="#929292"
          onChangeText={(name) => setname(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput1}
          placeholder="Mobile Number"
          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(contact) => setcontact(contact)}
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput1}
          placeholder="Address"
          placeholderTextColor="#929292"
          onChangeText={(ADR) => setADR(ADR)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput1}
          placeholder="Password"
          placeholderTextColor="#929292"
          secureTextEntry={true}
          onChangeText={(password) => setpassword(password)}
        />
      </View>
      <Text style={styles.error}>{emptyFields}</Text>
      <Text style={styles.error}>{emailError}</Text>
      <Text style={styles.error}>{contactError}</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
            <Text style={styles.TextInput}>Confirm</Text>
            
        </TouchableOpacity>
        
      </View>
  );
}
 
