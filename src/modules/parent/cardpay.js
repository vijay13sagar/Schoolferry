/*import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Alert,
  Modal,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
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
        setNOC(response.data.name)
        setCardN(response.data.cardno)
        setExpiry(response.data.expiry)
        
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
        console.log("preshandler loki veltundi");
        pressHandler();
        //setModalVisible(true);
        return value_error
      }
  }
  const pressHandler = async () => {
    console.log("entering");
      let token = await AsyncStorage.getItem('token')
      console.log("hit payment",token)
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
            save:saved,
            childid:route.params.childid,
            parentid:token,

          }
        })
          .then(function (response) {
            if (response.status == 200) {
              console.log("payment success");
              setModalVisible(true);
              //setModalVisible(!modalVisible);
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
            childid:route.params.childid,
            startdate:route.params.maxDate,
            enddate:route.params.tomorrow,
            tenure:route.params.f,
            amount:e,
          }
        })
          .then(function (response) {
            if (response.status == 200) {
              console.log("plan details sent")
            }

            console.log("response", response.status);
          })
          .catch(function (error) {
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            if (error.response.status == 401) {
              //redirect to login
              console.log('plan details not sent')
            }

          })
      }
      catch (error) {
        console.log("errordetails", error);
      }

  }
  return (


    <View style={{justifyContent:'center',marginVertical:10,backgroundColor: "#F9F2F2",}}>
      <View style={{flexDirection:'row',marginTop:20,alignSelf:'center'}}>
        <Text>Click to fill previously saved </Text>
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
          value={NOC}
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
          keyboardType="numeric"
          value={CardN}
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
          maxLength = {3}
        />
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Expiry Date</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Expiry Date"
          value={Expiry}
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
                  navigation.navigate('New_sub_screen');
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
          pressHandler1();
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
    //fontWeight: "bold",
    textAlign: "center",
    fontSize:15,
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

});*/

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import stripe from 'tipsi-stripe';
import Button from '../../components/PaymentButton';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';

stripe.setOptions({
  publishableKey:
    'pk_test_51IZAAASCYy6hVMxJHvsmow6FXKpv9fnsK4ESEgtKFI9JjyEtXGhwUsyGfvtHMliiogTanOUX3WXluf8y77KVY72q00zgnOWoFX',
  // merchantId: '<MERCHANT_ID>',
  //androidPayMode: 'test',
});

export default function CardFormScreen({route, navigation}) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [cardno, setCardno] = useState();
  const [id, setId] = useState();
  const [savedData, setSavedData] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const[count,setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  let amount = route.params.costly;
  let childID = route.params.childid;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let token = await AsyncStorage.getItem('token');
        let response = await axios.get(
          `${Ngrok.url}/api/payment/cardsaved/${token}`,
        );
        console.log('card data: ', response.data);
        setisLoading(false);
        if (response.data.length > 0) {
          setSavedData(response.data);
        }
        else {
          setSavedData([]);
        }
      } catch (error) {}
    };
    fetchdata();
  }, [count]);

  const handleCardPayPress = async () => {
  
    try {
      setLoading(true);
      setpaymentMethod(null);

      const paymentMethod = await stripe.paymentRequestWithCardForm({
        card: {
          number: '4000002500003155',
          cvc: '123',
          expMonth: 11,
          expYear: 2020,
        },
      });

      setLoading(false);
      setpaymentMethod(paymentMethod);
      setCardno(paymentMethod.card.last4);
      setId(paymentMethod.id);
      // console.log(paymentMethod);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteHandler = (value) => {
  console.log(value);
    Alert.alert('Are you sure ?', ' ', [
      {
        text: 'Yes',
        onPress: () => deletecard(),
      },
      {text: 'Discard', style: 'cancel'},
    ]);

    const deletecard = async() => {
      setisLoading(true)
      let parentId = await AsyncStorage.getItem('token');
      try {
        axios.post( `${Ngrok.url}/api/payment/carddelete`, {
          parentid:parentId,
          cardno:value
        })
        .then(function (response) {
          console.log('response:', response.data.message);
          setisLoading(false);

          if (response.data.message == 'Card deleted successfully') {
            Alert.alert('Card Deleted Successfully');
            setCount(count+1)
          }
        })
        .catch(function (error) {
          console.log(error);
          setisLoading(false);
          Alert.alert('Failed. Please Try Again');
        });

        
      } catch (error) {
        
      }

    }
  };

  const paymentHandler = async (value) => {
    setisLoading(true);
    let parentId = await AsyncStorage.getItem('token');
    console.log('PID', parentId);
    console.log('card no', cardno);
    console.log('paymentmethod', id);
    console.log('save?', isSelected);
    console.log('amount', amount);
    setTokenData(value)
    
    console.log('token',value)
    try {
      axios
        .post(`${Ngrok.url}/api/payment`, {
          childid: childID,
          parentid: parentId,
          cardno: cardno,
          paymentmethod: id,
          amount: Number(amount),
          token: value,
          save: isSelected,
        })
        .then(function (response) {
          console.log('payment response:', response.data.message);
          setisLoading(false);

          if (response.data.message == 'Payment Succesful. Thanks.') {
           setModalVisible(true)
            setCount(count+1)
          } else if (
            response.data.message == 'Payment Successful. Card Saved. Thanks.'
          ) {
            setModalVisible(true)
            //setCount(count+1)
          } else if (
            response.data.message == 'Payment failed. Please contact your bank.'
          ) {
            Alert.alert('Payment failed. Please contact your bank.');
          }
        })
        .catch(function (error) {
          console.log(error);
          setisLoading(false);
          Alert.alert('Failed. Please Try Again');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <View style={styles.container}>
      <Loader loading={isLoading} />
    </View>
  ) : (
    <View style={styles.container}>
      <Loader loading={isLoading} />
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
                fontSize:14,
              }}>Payment Successful</Text>

              <TouchableHighlight
                style={{ ...styles.openButtono, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('New_sub_screen');
                }}
              >
                <Text style={{color:'#fff',textAlign:'center'}}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      <Text style={styles.header}>You are making payment of </Text>
      <Text style={styles.instruction}>₹ {amount}</Text>
      {Boolean(savedData.length) ? (
        <>
          <Text style={styles.heading}>Use Saved Cards -</Text>  
          <FlatList
            style={{flexGrow: 0,}}
            data={savedData}
            keyExtractor={(item) => item.cardNo}
            renderItem={({item}) => (
              
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf
                  :'center'
                }}>
                <TouchableOpacity
                  style={styles.cardData}
                  onPress={() => {
                    paymentHandler(item.cardNo)
                  }}>
                  <Ionicons
                    name="card"
                    color="#000"
                    size={35}
                    style={styles.icon}
                  />
                  <Text style={styles.cardNumText}>
                    Card ending with {item.cardNo}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={()=> deleteHandler(item.cardNo)}>
                  <Ionicons
                    name="trash"
                    color="#fff"
                    size={30}
                    
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          
        </>
      ) : null}

      <Button
        text="Enter Card Details"
        loading={loading}
        onPress={handleCardPayPress}
      />
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        {paymentMethod ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              //marginBottom: 10,
              marginTop: 5,
            }}>
            <CheckBox
              value={isSelected}
              onValueChange={(isSelected) => setSelection(isSelected)}
              style={styles.check}
            />
            <Text style={{fontSize: 15, marginTop: 4}}>
              Save Card Details To Use In Future{' '}
            </Text>
          </View>
        ) : null}

        {paymentMethod ? (
          <TouchableOpacity style={styles.paybtn} onPress={()=>{paymentHandler(null)}}>
            <Text style={{fontSize: 15, color: '#fff'}}> Make Payment</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
 
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 150,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
  paymentMethod: {
    height: 20,
  },
  paybtn: {
    width: '60%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 50,
  },
  cardData: {
    width: '65%',
    backgroundColor: '#fff',
    height: 60,
    marginTop: 8,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    height: 60,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    borderWidth: 1,
  },
  cardNumText: {
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 15,
  },
  heading: {
    fontSize: 17,
    marginLeft: 25,
    marginTop: 20,
  },
  check: {
    marginTop: 5,
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
    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    //elevation: 5
  },
  openButtono: {
    backgroundColor: "#4DAFCE",
    borderRadius: 10,
    padding: 10,
    width:60,
    marginTop:10,  
  },
});
