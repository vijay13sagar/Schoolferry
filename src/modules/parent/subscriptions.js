import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Addsubscription from './addsubscription';
import Showplans from './showplans';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const subscription = ({ navigation }) => {
  const [childinfo, setChildInfo] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token');
      try {
        let response = await axios(
          `${Ngrok.url}/api/parent/registeration/${token}`,
        );
        let data = response.data.payment;
        let id = response.data.childId;
        if (data == 'registered') {
          setChildInfo(true);
        } else {
          setChildInfo(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    });

    fetchData;
  }, [navigation]);

  return isLoading ? (
    <View style={styles.container}>
      <Loader loading={isLoading} />
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
