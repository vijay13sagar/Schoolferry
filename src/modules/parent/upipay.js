import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import styles from '../../components/style';

export default function App({ route, navigation }) {
  const [UPI, setUPI] = useState('');
  const [{ value_error }, setError] = useState('');
  const [entry, setentry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  let s = route.params.costly;
  const e = s.toString();

  const pressHandler1 = () => {
    if (!UPI) {
      setError({ value_error: 'Field cannot be Empty' });
      return value_error;
    }
    if (UPI) {
      setError({ value_error: null });
      pressHandler();
      return value_error;
    }
  };
  const pressHandler = () => {
    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/payment/upi`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          childid: route.params.childid,
          upi: UPI,
        },
      })
        .then(function (response) {
          if (response.status == 200) {
            setModalVisible(!modalVisible);
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          if (error.response.status == 401) {
            Alert.alert('payment unsucessful');
          }
        });
    } catch (error) {
      console.log('errordetails', error);
    }
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
          amount: e,
        },
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert('plan details sent');
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          if (error.response.status == 401) {
            Alert.alert('plan details not sent');
          }
        });
    } catch (error) {
      console.log('errordetails', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textview}>
        <Text style={styles.headertext}>Enter UPI ID</Text>
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
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: 'center',
                }}>
                Payment Successful
              </Text>

              <TouchableHighlight
                style={{ ...styles.openButtono, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  sendplan();
                  navigation.navigate('New_sub_screen');
                }}>
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
        }}>
        <Text style={styles.loginText}>Confirm</Text>
      </TouchableHighlight>
    </View>
  );
}
