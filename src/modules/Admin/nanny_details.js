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
import styles from '../../components/styles_admin'


export default function nanny_Details({ route, navigation }){
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  
  console.log("this.props",route.params.item.releaseYear);
 
 
  return (
    

    <View style={styles.container2}>
      <StatusBar style="auto" />
      
        <View style={{marginRight:280,marginTop:40}}>
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
     
      
     

    </View>

  );

}
