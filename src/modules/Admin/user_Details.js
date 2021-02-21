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
import UserSubscription from "./usersubscription";



export default function user_Details({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setcontact] = useState("");
  const [VN, setVN] = useState("");
  const [{ LIC }, setLIC] = useState("");
  const [{ EXP }, setEXP] = useState("");

  console.log("this.props", route.params.item);




  return (

    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ width: "70%" }}>
          <Text>Name</Text></View>

        <View style={styles.details}>
          <Text >

            {route.params.item.name}

          </Text>
        </View>

        <View style={{ width: "70%" }}>
          <Text>Email ID</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.email}

          </Text>
        </View>

        <View style={{ width: "70%" }}>
          <Text>Phone Number</Text></View>
        <View style={styles.details}>
          <Text >

            {route.params.item.contact}

          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>Address</Text></View>

        <View style={styles.details}>
          <Text >

            {route.params.item.address}

          </Text>
        </View>

        {/* <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('userSubscription')}  >
          <Text style={styles.loginText}>Child Details</Text>

        </TouchableOpacity> */}
        {/* <UserSubscription /> */}
        <TouchableOpacity style={styles.loginBtn2} onPress={() => navigation.navigate('child_Details')}  >
          <Text style={{alignSelf:"flex-start",marginLeft:7}}>child 1</Text>

        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn2} onPress={() => navigation.navigate('child_Details')}  >
          <Text style={{alignSelf:"flex-start",marginLeft:7}}>child 2</Text>

        </TouchableOpacity> 

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

  contain: {
    flex: 1,
    width:"100%",
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
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  details: {
    height: 40,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },
  detailsAddress: {
    height: 100,
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
    padding: 1,

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
  loginBtn2: {
    width: "95%",
    
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
  title:{
    position:'absolute',
    marginTop:65,
    marginBottom:0,
    marginHorizontal:20,
    fontSize: 30,
    color:'white',
    fontWeight:'bold'
}, time:{
    width:'20%',
    marginVertical: 20,
    position:'absolute',
    backgroundColor:'green',
    color:'white',
    fontSize: 25,
    fontWeight:'bold',
    bottom:0,
    borderRadius:20,
    marginLeft: 20
}
});