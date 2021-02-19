
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect,useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
//import forgotPassword from "./forgotPassword";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';


export default function addchild({navigation}) {
  const [CN, setCN] = useState("");
  const [CA, setCA] = useState("");
  const [CB, setCB] = useState("");
  const [SN, setSN] = useState("");
  const [SA, setSA] = useState("");
  const [ST, setST] = useState("");
  const [ET, setET] = useState("");
  const [{value_error},setError] = useState ("");
  
 
  const  validateFunction= () => {
    if (!CN || !CA || !CB || ST || ET || !SA || !SN) {
        setError({value_error: "Fields Cannot be Empty" })
        return value_error
    }
    if(CN && CA && CB && SA && ST  && ET && SN){
      setError({value_error: null})
      //navigation.navigate('Subscription_list')
    }
}
const handlePress = async () => {
  console.log('responseclick');
  console.log('validateFunction',validateFunction());
  let token= await AsyncStorage.getItem('token');
  console.log(token)
  //if (validateFunction()) {
    console.log('validateFunction',validateFunction());
    /* const body = {
       id: email,
        password: password
     }*/
    /*let response = await loginApi(body)*/
    fetch(`${Ngrok.url}/api/child`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:CN,
    age:CA,
    bloodgroup:CB,
    schoolname:SN,
    schooladdress:SA,
    parentid:token,
    // parentid:PID,
      })
    })
    .then((response) => {
      console.log('response:',response.status);
      response.json()
        console.log('resp',response.status);
        if (response.status == 200) {
         navigation.navigate('Subscription_list')
          //alert("Login Sucessful")
          
        } else {
          alert('Login failed ')
        }
      })
      //})
      // .catch(err => {
      //   console.log(err);
      // });
  //}
  // const [count, setCount] = useState(0);
   
}
  return (

    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../assets/Logo.png")} /> */}
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Child Name"
          placeholderTextColor="#929292"
          onChangeText={(CN) => setCN(CN)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Child Age"
          keyboardType="numeric"
          placeholderTextColor="#929292"
          onChangeText={(CA) => setCA(CA)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Blood Group"
          placeholderTextColor="#929292"
          onChangeText={(CB) => setCB(CB)}
        />
      </View>
         <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="School Name"
          placeholderTextColor="#929292"
          onChangeText={(SN) => setSN(SN)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="School"
          placeholderTextColor="#929292"
          onChangeText={(SA) => setSA(SA)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="School Start Time"
          placeholderTextColor="#929292"
          onChangeText={(ST) => setST(ST)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="School End Time"
          placeholderTextColor="#929292"
          onChangeText={(ET) => setET(ET)}
        />
      </View>
      <Text style={styles.error}>{value_error}</Text>
      <TouchableOpacity style={{alignItems:'center', justifyContent:'center'},styles.loginBtn}
                onPress={handlePress} >
          <Text style={styles.loginText}>Add Child</Text>
      </TouchableOpacity>

    </View>

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
    padding:2,
    //alignItems: "center",
    // justifyContent:'center',
   // alignContent:'center',
     //alignSelf:'center',
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    //marginLeft: 100,
    //marginBottom:10,

  },
  error: {
    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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