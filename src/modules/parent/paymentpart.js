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
//import AsyncStorage from '@react-native-community/async-storage';

export default function App({ navigation }) {
  const [NOC, setNOC] = useState("");
  const [CardN, setCardN] = useState("");
  const [CVV, setCVV] = useState("");
  const [Expiry, setExpiry] = useState("");
  const [UPI, setUPI] = useState("");
  const [{ value_error }, setError] = useState("");
  const [entry, setentry] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let saved = "no";
 
  // useEffect( async () => {
  //   let token = await AsyncStorage.getItem('token')
  //   fetch(`${Ngrok.url}/api/profiledetails/driver/${token}`, {
  //     "method": "GET",
  //     "headers": {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       //console.log(responseJson);
  //       getData(responseJson)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, [])
  const pressHandler1 = () => {
    if (!UPI) {
      if (!CardN && !NOC && !CVV && !Expiry) {
        setError({ value_error: "Fill UPI or Card details" })
        return value_error
      }
    }
    if (!UPI) {
      if (!CardN || !NOC || !CVV || !Expiry) {
        setError({ value_error: "Fill Card details completely" })
        return value_error
      }
      if (UPI) {
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
      } else if (CardN && NOC && CVV && Expiry) {
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
  }


  const [isSelected, setSelection] = useState(false);
  
   

  // const pressHandler = () => {
  //   fetch(`${Ngrok.url}/api/payment`, {
  //     "method": "POST",
  //     "headers": {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       cardno: CardN,
  //       cardname:NOC ,
  //       cvv: CVV,
  //       expiry: Expiry,
  //       password: UPI,
  //       //save:saved,
  //       //childid:token2,
  //       //parentid:token,
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       if (responseJson.message == "Payment Succesful. Thanks.") {
  //         setModalVisible(!modalVisible);
  //       }else {
  //         alert('sign up failed')
  //       }
  //       //alert(JSON.stringify(response))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  //   let saved='yes';
  //   if(isSelected){
  //     saved='yes'
  //   }
  //   else{
  //     saved='no'
  //   }
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
            childid: "C001",
            upi: UPI,
            // contact: contact,
            // password: password
            // cardno: CardN,
            // cardname: NOC,
            // cvv: CVV,
            // expiry: Expiry,
            // password: UPI,
            // save:saved,
            // childid:"C001",
            // parentid:"P001",

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
  return (


    <View style={styles.container}>
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
        <Text style={styles.headertext} >Name on Card</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
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
        {/* {isSelected ? "👍" : "👎"} */}
        <Text style={{ fontSize: 15, marginTop: 4 }}>Save Card Details</Text>
      </View>
      
      <TouchableHighlight
        style={styles.loginBtn}
        onPress={() => {
          pressHandler();
          //setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </TouchableHighlight>
      <Text style={styles.headertext} > ------------------------------------------OR----------------------------------------- </Text>
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
        // onPress={() => {
        //   pressHandler();
        //   //setModalVisible(true);
        // }}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </TouchableHighlight>

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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