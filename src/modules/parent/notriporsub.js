import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Content, Card, CardItem, Body} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';

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

          console.log('tracking page:', response.data.payment);
          console.log('Trip Status:', response2.data);

          let data = response.data.payment;
          setripDetails(response2.data);
          setLoading(false);

          if (data == 'subscribed') {
            setUserType(true);
          } else {
            setUserType(false);
          }
        } catch (e) {
          // Handle error
        }
      };

      fetchUser();

      //return null;
    }, []),
  );

  const Nosubs = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <View style={styles.body}>
          <Text style={styles.name}>No subscription added</Text>
        </View>
        <Text style={styles.centerview}>
          Tracking service is only available with subscription. Check service
          availability at your area.
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('location', {refresh: true})}>
          <Text style={{fontSize: 16}}>Check availability</Text>
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
                  <Body>
                    {item.trips.length ? (
                      <View style={styles.bodyView}>
                        {/* <Text> Trip ID - {item.trips[0].tripId} </Text>*/}
                        <Text>
                          {' '}
                          Trip start status - {item.trips[0].startStatus}{' '}
                        </Text>
                        <Text>
                          {' '}
                          Trip end status - {item.trips[0].endStatus}{' '}
                        </Text>
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
                          <Text style={{fontSize: 15}}>Track Vehicle</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text style={{fontSize: 17}}>No trips for today</Text>
                    )}
                  </Body>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },

  centerview: {
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 3,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
  },
  body: {
    marginVertical: 40,
    alignSelf: 'center',
  },
  headertext: {
    fontSize: 13,
    marginTop: 15,
    marginLeft: 35,
    alignItems: 'center',
  },

  loginBtn: {
    width: '60%',
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    marginTop: 20,
  },
  nameText: {
    fontSize: 19,
    fontWeight: '700',
  },
  tripBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#ff5c8d",
    alignSelf: 'center',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  flatlist: {
    marginTop: 10,
    width: '95%',
    marginLeft: 10,
  },
  bodyView: {
    // borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    padding: 5,
  },
  trackVehicle: {
    width: '50%',
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 5,
  },
  disabled: {
    width: '50%',
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a9a9a9',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 5,
  },
});
