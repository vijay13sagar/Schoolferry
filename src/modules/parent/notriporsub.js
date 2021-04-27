import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';

import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Content, Card, CardItem, Body} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const oldmap = ({navigation}) => {
  const [flag, setflag] = useState(true);
  const [userType, setUserType] = useState();
  const [isLoading, setLoading] = useState(true);
  const [tripDetails, setripDetails] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          let token = await AsyncStorage.getItem('token');

          let response = await axios(
            `${Ngrok.url}/api/parent/subscription/${token}`,
          );
          let response2 = await axios(
            `${Ngrok.url}/api/parent/trip/start/${token}`,
          );

          let data = response.data.payment;
          setripDetails(response2.data);
          setLoading(false);

          if (data == 'subscribed') {
            setUserType(true);
          } else {
            setUserType(false);
          }
        } catch (e) {}
      };
      fetchUser();
    }, []),
  );

  const Nosubs = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <View style={styles.body}>
          <Text style={styles.name}>No subscription added</Text>
        </View>
        <Text style={styles.centerview1}>
          Tracking service is only available with subscription. Check service
          availability to get started.
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('location', {refresh: true})}>
          <Text style={styles.loginText}>Check availability</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Subs = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <Text style={styles.mainHeading}> Trips for Today </Text>
        <FlatList
          style={styles.flatlist}
          data={tripDetails}
          keyExtractor={(item) => item.childId}
          renderItem={({item}) => (
            <Content>
              <Card>
                <CardItem header>
                  <Text style={styles.nameText}>{item.childName} -</Text>
                </CardItem>
                <CardItem bordered>
                  {item.trips.length ? (
                    <Body style={styles.bodyView}>
                      <Text>
                        {' '}
                        Trip start status - {item.trips[0].startStatus}{' '}
                      </Text>
                      <Text> Trip end status - {item.trips[0].endStatus} </Text>
                      <TouchableOpacity
                        style={
                          item.trips[0].endStatus == 'ended' ||
                          item.trips[0].startStatus == 'not started'
                            ? styles.disabled
                            : styles.trackVehicle
                        }
                        disabled={
                          item.trips[0].endStatus == 'ended' ||
                          item.trips[0].startStatus == 'not started'
                            ? true
                            : false
                        }
                        onPress={() =>
                          navigation.navigate('Track', {
                            tripId: item.trips[0].tripId,
                          })
                        }>
                        <Text style={{fontSize: 15, color: '#fff'}}>
                          Track Vehicle
                        </Text>
                      </TouchableOpacity>
                    </Body>
                  ) : (
                    <Body>
                      <Text style={{fontSize: 16}}>No trips for today</Text>
                    </Body>
                  )}
                </CardItem>
              </Card>
            </Content>
          )}
        />
      </View>
    );
  };
  return isLoading ? (
    <View style={styles.container}>
      <Loader loading={isLoading} />
    </View>
  ) : (
    <View style={styles.container}>{userType ? <Subs /> : <Nosubs />}</View>
  );
};

export default oldmap;
