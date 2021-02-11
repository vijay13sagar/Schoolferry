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
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';

export default function Add_Driver() {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [contact, setcontact] = useState("");
  const [ADR, setADR] = useState("");
  const [LIN, setLIN] = useState("");
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
    else { return false }

  };

  const validateFunction = () => {

    if (!name || !email || !contact || !ADR || !LIN || !password) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
      setcontactError({ contactError: null })
      setEmailError({ emailError: null })
      return false
    }
    else if (!validateEmail(email)) {
      setEmailError({ emailError: "Enter Valid Email Id" })
      setcontactError({ contactError: null })
      setemptyFeilds({ emptyFields: null })

      return false
    }
    else if (!validatecontact(contact)) {
      setcontactError({ contactError: "Enter Valid Phone Number" })
      setEmailError({ emailError: null })
      setemptyFeilds({ emptyFields: null })
      return false
    }
    // else {
    //   setEmailError({ emailError: null })
    //   setemptyFeilds({ emptyFields: null })
    //   setcontactError({contactError:null})
    //   return false
    // }

    return true

  }

  function pressHandler() {
    console.log("validation", validateFunction())
    if (validateFunction()) {

      console.log("apistarts")
     
      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}api/admin/register/driver`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            name: name,
            email: email,
            contact: contact,
            address: ADR,
            experience: EXP,
            photourl: "NULL",
            idproofurl: "NULL",
            password: password

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
          if(error.response.status == 401){
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


      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#929292"
          onChangeText={(name) => setname(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile Number"
          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(contact) => setcontact(contact)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#929292"
          onChangeText={(ADR) => setADR(ADR)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Licence No"
          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(LIN) => setLIN(LIN)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
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
        <Text style={styles.loginText}>Confirm</Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
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
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },

  TextInput: {
    height: 50,
    alignItems: "flex-start",
    padding: 10,
    marginLeft: 10,

  },

  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',

  },
  error: {
    padding: 1,

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