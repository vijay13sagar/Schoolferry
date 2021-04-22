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
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';

export default function Add_Driver({navigation}) {
  const [isloading, setLoading] = useState(false);
  const [VH, setVH] = useState("");
  const [Gps, setGps] = useState("");
  const [Model, setModel] = useState("");
  const [Cap, setCap] = useState("");
  const [Type, setType] = useState();
  const [{ emptyFields }, setemptyFeilds] = useState("");
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const validateFunction = () => {
    
    if (!VH||!Gps || !Model || !Type|| !Cap ) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
       return false
    }
    return true
  }
    function  pressHandler() {
     
      if (validateFunction()) {
    try {
      setLoading(true);

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
          setLoading(false);
          if (response.status == 200) {
            Alert.alert('Registration Successful','', [{text: 'Proceed', onPress:() => navigation.navigate('vehicleList',)}])
          }

          
        })
        .catch(function (error) {
          setLoading(false);
         
          setToast(true)
        if(error.response.status==401){
         
          setLoading(false);
         
          setToast(true)
        }
     
        })
    }
       catch(error){
        setLoading(false);
      
        setToast(true)
       }
     }
     setToast(false)
   }
  
 
   return (
    <View style={styles.container}>
            {showtoast? (<ToastComponent type = {ToastMessage.failure}  message = {ToastMessage.message5}/>): null}

      <Loader loading={isloading} />
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput2}
          placeholder="Enter Vehicle Number"
          placeholderTextColor="#929292"
          onChangeText={(VH) => setVH(VH)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput2}
          placeholder="Enter GPS Tracking Number"
          placeholderTextColor="#929292"
          onChangeText={(Gps) => setGps(Gps)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput2}
          placeholder="Enter Type"
          placeholderTextColor="#929292"
          onChangeText={(Type) => setType(Type)}
        />
      </View>
       <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput2}
          placeholder="Enter Model"
          placeholderTextColor="#929292"
          onChangeText={(Model) => setModel(Model)}
        />
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput2}
          placeholder="Capacity"
          placeholderTextColor="#929292"
          onChangeText={(Cap) => setCap(Cap)}
        />
      </View>
     
      <Text style={styles.error}>{emptyFields}</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={pressHandler}>
            <Text style={styles.TextInput}>Register</Text>
          
            
        </TouchableOpacity>
      </View>
  );
}
 
