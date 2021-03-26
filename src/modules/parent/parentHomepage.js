import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';

import Subhome from './subhome';
import Unsubhome from './unsubscribedhome';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';

const HomeScreen = ({navigation}) => {
  const [userType, setUserType] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      let token = await AsyncStorage.getItem('token');
      let response = await axios(
        `${Ngrok.url}/api/parent/subscription/${token}`,
      );

      console.log(response.data.payment);
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
        backgroundColor="#E91E63"
        //Background color of statusBar only works for Android
        translucent={false}
      />
      <Loader loading={isLoading} />
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#E91E63"
        //Background color of statusBar only works for Android
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
});
