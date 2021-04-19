import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ngrok from '../../constants/ngrok';
import Loader from '../../components/Loader';
import styles from '../../components/styles_admin'
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';



export default function Edit_Nanny({ route,navigation }) {
  const [showtoast,setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [isloading, setLoading] = useState(false);
  let c = route.params.tripid1;
  
  let nannyid = route.params.item.id;
 

  const pressHandler = () => {
    setLoading(true);
    fetch(`${Ngrok.url}/api/admin/trips/nanny/new`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nannyid : nannyid,
             tripid : c
    
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);

        if (responseJson.message == "nanny changed") {
          Alert.alert('Changed Successfully','', [{text: 'Proceed', onPress:() => navigation.navigate('Home_page')}])
        } else {
          
          setToast(true)
        }
        
      })
      .catch(err => {
        setToast(true)
        setLoading(false);

      });
  
      setToast(false)
}


return (
<View style={styles.container1}>
{showtoast? (<ToastComponent type = {ToastMessage.failure}  message = {ToastMessage.message5}/>): null}
  <ScrollView>
     <Loader loading={isloading} />
    
      <StatusBar style="auto" />
      <View style={{ width: "70%",marginLeft: 35 ,marginTop:40}}>
        <Text>Name</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.name}

        </Text>
      </View>
      <View style={{ width: "70%", marginLeft: 35}}>
        <Text>Contact Number</Text></View>

      <View style={styles.details}>
        <Text>

          {route.params.item.contact}

        </Text>
      </View>

      <View style={{ width: "70%", marginLeft: 35}}>
        <Text>Nanny ID</Text></View>
      <View style={styles.details}>
        <Text>

          {route.params.item.id}

        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn}
        onPress={pressHandler} >
        <Text style={styles.TextInput}>Assign Nanny</Text>
      </TouchableOpacity>

    
  </ScrollView>
  </View>

);

}
