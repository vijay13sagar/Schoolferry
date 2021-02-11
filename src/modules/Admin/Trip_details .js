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


export default function trip_Details({ route, navigation }){
  const [email, setEmail] = useState(route.params.item.releaseYear);
  const [name, setname] = useState(route.params.item.title);
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  const [{ EXP }, setEXP] = useState("");
  
  console.log("this.props",route.params.item.releaseYear);
  return (
    
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={{width:"70%"}}>
        <Text>Name</Text></View> 
        
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.name}
          placeholderTextColor="black"
          onChangeText={(name) => setname(name)}
        />
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Email ID</Text></View> 
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          //value={route.params.item.email}
          placeholderTextColor="#929292"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
     
      <View style={{width:"70%"}}>
        <Text>Phone Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.contact}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#929292"
          onChangeText={(contact) => setcontact(contact)}
        />
      </View>
      <View style={{width:"70%"}}>
        <Text>Address</Text></View> 
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.address}
          placeholderTextColor="#929292"
          onChangeText={(Address) => setAddress(Address)}
        />
      </View>
      <View style={{width:"70%"}}>
        <Text>Vehicle Number</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          placeholderTextColor="#929292"
          secureTextEntry={true}
          onChangeText={(VN) => setVN(VN)}
        />
      </View>
      <View style={{width:"70%"}}>
        <Text>Experience</Text></View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder=""
          value={route.params.item.experience}
          placeholderTextColor="#929292"
          onChangeText={(EXP) => setEXP(EXP)}
        />
      </View>

      <View style={{width:"70%"}}>
        <Text>Licence Number</Text></View> 
      <View style={styles.inputView}>
        <Text
          style={styles.Text} 
        >
          {route.params.item.experience}
          </Text>
      </View>

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
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});