
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, StatusBar, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Subhome from './subhome';
import Unsubhome from './unsubscribedhome';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {
  const [userType, setUserType] = useState(false)

  useEffect(() => {

    async function fetchData() {
     let token = await AsyncStorage.getItem('token')
      let response = await axios(`${Ngrok.url}/api/parent/subscription/${token}`)

      console.log(response.data.payment)
      let data = response.data.payment

      if (data == "subscribed") {
        setUserType(true);
      }
    }

    fetchData();
  }, [])

  return (
    <View style={styles.container}>
      {userType ? < Subhome navigation={navigation} /> : < Unsubhome navigation={navigation} />}
    </View>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },

})