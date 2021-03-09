import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Addsubscription from './addsubscription';
import Showplans from './showplans';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const subscription = ({navigation}) => {
  const [childinfo, setChildInfo] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token');
      let response = await axios(
        `${Ngrok.url}/api/parent/registeration/${token}`,
      );

      console.log('status:', response.data.payment);

      let data = response.data.payment;
      let id = response.data.childId;
      if (data == 'registered') {
        setChildInfo(true);
      } else {
        setChildInfo(false);
      }
      setLoading(false);
    });

    fetchData;
  }, [navigation]);

  return isLoading ? (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 200}}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {childinfo ? (
        <Showplans navigation={navigation} />
      ) : (
        <Addsubscription navigation={navigation} />
      )}
    </View>
  );
};

export default subscription;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
});
