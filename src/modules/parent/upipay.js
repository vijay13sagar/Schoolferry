import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Alert,
  Modal,
  StatusBar,
  Text,
  View,
  Image,
  CheckBox,
  TextInput,
  Button,
  TouchableHighlight,

  TouchableOpacity,
} from "react-native";
//import { CheckBox } from "@react-native-community/checkbox";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
//import AsyncStorage from '@react-native-community/async-storage';

export default function App({ route,navigation }) {
  const [UPI, setUPI] = useState("");
  const [{ value_error }, setError] = useState("");
  const [entry, setentry] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let s=route.params.costly;
  const e=s.toString();
  const pressHandler1 = () => {
    if (!UPI) {
        setError({ value_error: "Field  can not be Empty" })
        return value_error
      }
      if (UPI) {
        setError({ value_error: null });
        setModalVisible(true);
        return value_error
      } 
    }
  const pressHandler = () => {
    if (pressHandler1()) {


      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/payment/upi`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            childid: "C040",
            upi: UPI,
          }
        })
          .then(function (response) {
            if (response.status == 200) {
              setModalVisible(!modalVisible);
            }

            console.log("response", response.status);
          })
          .catch(function (error) {
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            if (error.response.status == 401) {
              //redirect to login
              Alert.alert('payment unsucessful')
            }
          })
      }
      catch (error) {
        console.log("errordetails", error);
      }

    }
  }
  const sendplan = () => {

    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/plandetails`,
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          childid:"C043",//token of child id
          startdate:route.params.maxDate,
          enddate:route.params.tomorrow,
          tenure:route.params.f,
          amount:e,
        }
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert("plan details sent")
          }

          console.log("response", response.status);
        })
        .catch(function (error) {
          console.log(error.response.status) // 401
          console.log(error.response.data.error) //Please Authenticate or whatever returned from server
          if (error.response.status == 401) {
            //redirect to login
            Alert.alert('plan details not sent')
          }

        })
    }
    catch (error) {
      console.log("errordetails", error);
    }

}
  return (


    <View style={{backgroundColor: "#F9F2F2",justifyContent:'center',marginVertical:10,}}>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
      
      
      <View style={styles.textview}>
        <Text style={styles.headertext} >Enter UPI ID</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="UPI ID"
          placeholderTextColor="#929292"

          onChangeText={(UPI) => setUPI(UPI)}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{
                marginBottom: 15,
                textAlign: "center",
              }}>Payment Successful</Text>

              <TouchableHighlight
                style={{ ...styles.openButtono, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  sendplan();
                  navigation.navigate('Subscription_list');
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


      </View>
      <Text style={styles.error}>{value_error}</Text>
      <TouchableHighlight
        style={styles.loginBtn}
        onPress={() => {
          pressHandler();
          //setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </TouchableHighlight>

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F2F2",
    justifyContent: "center",
  },
  check: {
    marginLeft: 35,
  },

  image: {
    marginBottom: 40,
  },
  error: {
    color: '#dc143c',
    fontSize: 11,
    marginTop: 2,
    alignSelf: 'center',
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45, alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  textview: {
    justifyContent:'center',
    marginBottom: 7,

  },
  headertext: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 35,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,

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
    marginBottom: 90,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
    alignSelf: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width: '70%',
    backgroundColor: "#4DAFCE",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginBottom: 180,
  },
  openButtono: {
    backgroundColor: "#4DAFCE",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }

});