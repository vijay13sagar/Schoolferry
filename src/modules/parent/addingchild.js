import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import axios from 'axios';

export default function addchild({ route, navigation }) {
  const [CN, setCN] = useState("");
  const [CA, setCA] = useState("");
  const [CB, setCB] = useState("");
  const [ST, setST] = useState("");
  const [ET, setET] = useState("");
  const [SA, setSA] = useState(route.params.schooladdress);
  const [HA, setHA] = useState(route.params.homeaddress);
  const [{ value_error }, setError] = useState("");

  const distanceCal = route.params.distance;

  const validateFunction = () => {
    if (!CN || !CA || !CB || !ST || !ET || !SA || !HA) {
      setError({ value_error: "Fields Cannot be Empty" })
      return false
    } else {
      return true
    }
    /*if (CN && CA && CB && SA && ST && ET && HA ) {
      setError({ value_error: null })
      //navigation.navigate('Subscription_list')
    }*/
  }


  const handlePress = async () => {
    // console.log('responseclick');
    let token = await AsyncStorage.getItem('token');
    //console.log()
    if (validateFunction()) {

      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/child`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            name: CN,
            age: CA,
            bloodgroup: CB,
            address: HA,
            school: SA,
            starttime: ST,
            endtime: ET,
            distance: Number(distanceCal),
            parentid: token,

          }
        })
          .then(function (response) {
            console.log(response.status);
            if (response.status == 200) {
              console.log(response.data)
             // alert("successfull")
              navigation.navigate('Subscription_list', {
                childID: response.data,
                school: SA
              })
            }
            else {
              alert('failed ')
            }

          })
          .catch(function (error) {
            console.log(error)
            //console.log(error.response.status) // 401
            // console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            /*if(error.response.status == 401){
              //redirect to login
              Alert.alert('Phone Number Alredy Exist!')
            }*/

          })
      }
      catch (error) {
        console.log("errordetails", error);
      }

      /* const body = {
         id: email,
          password: password
       }*/
      /*let response = await loginApi(body)*/
      /*fetch(`${Ngrok.url}/api/child`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          name: CN,
          age: CA,
          bloodgroup: CB,
          address:HA,
          school:SA,
          starttime:ST,
          endtime:ET,
          distance:Number(route.params.distance),
          parentid: token,
        }
      })
        .then((response) => {
          console.log('response:', response.status);
          response.json()
          console.log(response)
          //console.log('resp', response.status);
          if (response.status == 200) {
           /* navigation.navigate('Subscription_list',{
              childID: response,
              school:route.params.schooladdress
            })*/
      /* alert("Login Sucessful")
       console.log('child', response)
     } else {
       alert('failed ')
     }
   })*/
      //})
      // .catch(err => {
      //   console.log(err);
      // });
      //}
      // const [count, setCount] = useState(0);
    }
  }
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../assets/Logo.png")} /> */}
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#E91E63"
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
      <View style={styles.inputaddress}>
        <TextInput
          style={styles.TextInput}
          placeholder="School"
          placeholderTextColor="#929292"
          onChangeText={(SA) => setSA(SA)}
          value={SA}
        />

      </View>
      <View style={styles.inputaddress}>
        <TextInput
          style={styles.TextInput}
          placeholder="Residence Address"
          placeholderTextColor="#929292"
          onChangeText={(HA) => setHA(HA)}
          value={HA}
        />

      </View>
      
       
      <Text style={styles.error}>{value_error}</Text>
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }, styles.loginBtn}
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
    borderColor: '#B0003A',
    borderRadius: 10,
    width: "80%",
    height: 45,
    padding: 2,
    // alignItems: "center",
    // justifyContent:'center',
    // alignContent:'center',
    // alignSelf:'center',
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  TextInput: {
    flex: 1,
    //height: 40,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,  
    padding: 8,
    alignSelf: "center"

  },
  error: {
    color: '#DC143C',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1E90FF',
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5C8D",
    alignSelf: "center",
    marginTop: 20,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
  inputaddress: {
    borderWidth: 1,
    borderColor: '#B0003A',
    borderRadius: 10,
    width: "80%",
    height: 50,
    padding: 2,
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,

  }
});