import AsyncStorage from '@react-native-community/async-storage';
import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, StatusBar, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ngrok from '../../constants/ngrok';
import Subhome from './subhome';
import Unsubhome from './unsubscribedhome';

const HomeScreen = ({navigation}) => {
  const [payment,setPayment] = useState(false)

   useEffect(() => {
    async function getData() {
      let paymentToken = await AsyncStorage.getItem('payment') 
      setPayment(paymentToken)
    }
      getData();

  }, [])



  return (
    <View style={styles.container}>
    {payment ? < Subhome /> :< Unsubhome navigation={navigation} /> }
    </View>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
  map: {
    height: '68%',

    // marginBottom: 20,
  },
  textview: {

  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 30,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    backgroundColor: "#ff5c8d",
    // marginVertical: 20
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    // fontWeight:'700'
  }

})