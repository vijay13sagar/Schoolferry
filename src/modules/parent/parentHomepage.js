import React, { useState, useEffect } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';

import Subhome from './subhome';
import Unsubhome from './unsubscribedhome';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const HomeScreen = ({ navigation }) => {
  const [userType, setUserType] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token');
      let response = await axios(
        `${Ngrok.url}/api/parent/subscription/${token}`,
      );
      let data = response.data.payment;

      if (data == 'subscribed') {
        setUserType(true);
      }
      setLoading(false);
    });
    fetchData;
  }, []);

  return isLoading ? (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      <Loader loading={isLoading} />
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      {userType ? (
        <Subhome navigation={navigation} />
      ) : (
        <Unsubhome navigation={navigation} />
      )}
    </View>
  );
};

export default HomeScreen;
