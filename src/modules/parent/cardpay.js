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
  Dimensions,
} from 'react-native';

import stripe from 'tipsi-stripe';
import Button from '../../components/PaymentButton';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';

stripe.setOptions({
  publishableKey:
    'pk_test_51IZAAASCYy6hVMxJHvsmow6FXKpv9fnsK4ESEgtKFI9JjyEtXGhwUsyGfvtHMliiogTanOUX3WXluf8y77KVY72q00zgnOWoFX',
});

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function CardFormScreen({route, navigation}) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [cardno, setCardno] = useState();
  const [id, setId] = useState();
  const [savedData, setSavedData] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();
  const [type, setType] = useState();

  let amount = route.params.costly;
  let childID = route.params.childid;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let token = await AsyncStorage.getItem('token');
        let response = await axios.get(
          `${Ngrok.url}/api/payment/cardsaved/${token}`,
        );
        setisLoading(false);
        if (response.data.length > 0) {
          setSavedData(response.data);
        } else {
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
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteHandler = (value) => {
    Alert.alert(`Delete card ending with ${value}`, ' ', [
      {
        text: 'Delete',
        onPress: () => deletecard(),
      },
      {text: 'Discard', style: 'cancel'},
    ]);

    const deletecard = async () => {
      setisLoading(true);
      let parentId = await AsyncStorage.getItem('token');
      try {
        axios
          .post(`${Ngrok.url}/api/payment/carddelete`, {
            parentid: parentId,
            cardno: value,
          })
          .then(function (response) {
            setisLoading(false);

            if (response.data.message == 'Card deleted successfully') {
              setToast(true);
              setType(ToastMessage.success);
              SetMessage(ToastMessage.message9);
              setCount(count + 1);
            }
          })
          .catch(function (error) {
            setToast(true);
            setType(ToastMessage.failure);
            SetMessage(ToastMessage.message5);
            console.log(error);
            setisLoading(false);
          });
      } catch (error) {}
    };
    setToast(false);
  };

  const savedCardPayemnt = (val) => {
    Alert.alert(`Making payment with card ending with ${val}`, ' ', [
      {
        text: 'Pay',
        onPress: () => paymentHandler(val),
      },
      {text: 'Discard', style: 'cancel'},
    ]);
  };

  const paymentHandler = async (value) => {
    setisLoading(true);
    let parentId = await AsyncStorage.getItem('token');
    setTokenData(value);
    sendplan();
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
          setisLoading(false);

          if (response.data.message == 'Payment Succesful. Thanks.') {
            setModalVisible(true);
            setCount(count + 1);
          } else if (
            response.data.message == 'Payment Successful. Card Saved. Thanks.'
          ) {
            setModalVisible(true);
          } else if (
            response.data.message == 'Payment failed. Please contact your bank.'
          ) {
            setToast(true);
            setType(ToastMessage.failure);
            SetMessage(ToastMessage.message10);
          }
        })
        .catch(function (error) {
          setToast(true);
          setType(ToastMessage.failure);
          SetMessage(ToastMessage.message5);
          console.log(error);
          setisLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    setToast(false);
  };

  const sendplan = () => {
    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/plandetails`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          childid: route.params.childid,
          startdate: route.params.maxDate,
          enddate: route.params.tomorrow,
          tenure: route.params.f,
          amount: amount.toString(),
        },
      })
        .then(function (response) {})
        .catch(function (error) {
          if (error.response.status == 401) {
            console.log('plan details not sent');
          }
        });
    } catch (error) {
      console.log('errordetails', error);
    }
  };

  return isLoading ? (
    <View style={styles.container}>
      <Loader loading={isLoading} />
    </View>
  ) : (
    <View style={styles.container}>
      {showtoast ? <ToastComponent type={type} message={message} /> : null}
      <Loader loading={isLoading} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 14,
              }}>
              Payment Successful
            </Text>

            <TouchableHighlight
              style={{...styles.openButtono, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('New_sub_screen');
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>OK</Text>
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
            style={{flexGrow: 0}}
            data={savedData}
            keyExtractor={(item) => item.cardNo}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={styles.cardData}
                  onPress={() => {
                    savedCardPayemnt(item.cardNo);
                  }}>
                  <Ionicons name="card" color="#000" size={32} />
                  <Text style={styles.cardNumText}>
                    Card ending with {item.cardNo}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteHandler(item.cardNo)}>
                  <Ionicons name="trash" color="#fff" size={28} />
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
              marginTop: 5,
            }}>
            <CheckBox
              value={isSelected}
              onValueChange={(isSelected) => setSelection(isSelected)}
              style={styles.check}
            />
            <Text style={{fontSize: 14, marginTop: 4}}>
              Save Card Details To Use In Future{' '}
            </Text>
          </View>
        ) : null}

        {paymentMethod ? (
          <TouchableOpacity
            style={styles.paybtn}
            onPress={() => {
              paymentHandler(null);
            }}>
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
    backgroundColor: '#FCFDDB',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 150,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 25,
  },
  paymentMethod: {
    height: 20,
  },
  paybtn: {
    width: width * 0.55,
    borderRadius: 10,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: height * 0.07,
  },
  cardData: {
    width: width * 0.65,
    backgroundColor: '#fff',
    height: height * 0.075,
    marginTop: 8,
    flexDirection: 'row',
    borderWidth: 0.8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: width * 0.01,
  },
  deleteBtn: {
    backgroundColor: 'red',
    height: height * 0.075,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.22,
    borderWidth: 0.8,
  },
  cardNumText: {
    alignSelf: 'center',
    fontSize: 15,
  },
  heading: {
    fontSize: 15,
    marginLeft: width * 0.07,
    marginTop: 20,
  },
  check: {
    marginTop: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
  },
  openButtono: {
    backgroundColor: '#4DAFCE',
    borderRadius: 10,
    padding: 10,
    width: 60,
    marginTop: 10,
  },
});
