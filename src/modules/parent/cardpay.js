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
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";

export default function App({ route,navigation }) {
  const [dat, setData] = useState("")
  const [NOC, setNOC] = useState("");
  const [CardN, setCardN] = useState("");
  const [CVV, setCVV] = useState("");
  const [Expiry, setExpiry] = useState("");
  const [{ value_error }, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  let saved = "no";
  let s=route.params.costly;
  const e=s.toString();
  const getcard = async() => {
    let token = await AsyncStorage.getItem('token')
    axios
      .get(`${Ngrok.url}/api/payment/cardsaved/${token}`)
      .then(function (response) {
        console.log("dat",response.data);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("error",error.message);
      })
      .finally(function () {
        // always executed
      });
  };
  const pressHandler1 = () => {
      if (!CardN && !NOC && !CVV && !Expiry) {
        setError({ value_error: "Fields can not be Empty" })
        return value_error
      }
      else if (!CardN || !NOC || !CVV || !Expiry) {
        setError({ value_error: "Fill Card details completely" })
        return value_error
      }
      else if (CardN && NOC && CVV && Expiry) {
        if (isSelected === false) {
          saved = "no";
          console.log("save",saved);
        } else {
          saved = "yes";
          console.log("save",saved);
        }
        setError({ value_error: null });
        setModalVisible(true);
        return value_error
      }
  }
  const pressHandler = async () => {
    if (pressHandler1()) {
      let token = await AsyncStorage.getItem('token')

      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/payment`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            cardno: CardN,
            cardname: NOC,
            cvv: CVV,
            expiry: Expiry,
            password: UPI,
            save:saved,
            childid:"C043",
            parentid:token,

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
        // .catch(function (error) {
        //   // handle error
        //   console.log("errordetails",error);
        // })
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
            childid:"C043",
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


    <View style={{justifyContent:'center',marginVertical:10,backgroundColor: "#F9F2F2",}}>
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
      <View style={{flexDirection:'row',marginTop:20,alignSelf:'center'}}>
        <Text>Click here to fill Previously saved </Text>
      <TouchableOpacity onPress={() => getcard()}  >
        <Text style={styles.forgot_button}>Card Details</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Name on Card</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          value={dat.name}
          placeholderTextColor="#929292"
          onChangeText={(NOC) => setNOC(NOC)}
        />
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Card Number</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Card Number"
          value={dat.cardno}
          placeholderTextColor="#929292"
          onChangeText={(CardN) => setCardN(CardN)}
        />
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >CVV</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="CVV"
          placeholderTextColor="#929292"
          secureTextEntry={true}
          onChangeText={(CVV) => setCVV(CVV)}
        />
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Expiry Date</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Expiry Date"
          value={dat.expiry}
          placeholderTextColor="#929292"
          onChangeText={(Expiry) => setExpiry(Expiry)}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.check}
        />
        <Text style={{ fontSize: 15, marginTop: 4 }}>Save Card Details</Text>
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
      {/* <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Payment Failed</Text>

            <TouchableHighlight
              style={{ ...styles.openButtono, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
     </View> */}
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