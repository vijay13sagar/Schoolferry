import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const Triphistory = ({ navigation }) => {
  const [stat, setStat] = useState(false)
  const [data, getData] = useState([])
  const [isloading, setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      setLoading(true)
      const fetchData = navigation.addListener('focus', async () => {
        let token = await AsyncStorage.getItem('token')
        axios
          .get(`${Ngrok.url}/api/driver/tripdetails/${token}`)
          .then(function (response) {
            setLoading(false)
            getData(response.data)
            if ((response.data[0].endedTripAt == false)) {
              setStat(false)
            } else {
              setStat(true)
            }
          })
          .catch(function (error) {
            console.log("error", error.message);
          })
          .finally(function () {
          });
      })
      fetchData
    })();
  }, [navigation])

  return (
    <View style={styles.container}>
      <Loader loading={isloading} />
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      <View >{stat ? <Text style={styles.startTripText}>Click to see Trip details</Text> : <Text style={styles.startTripText}>No Completed Trips</Text>}</View>
      <FlatList
        data={data}
        keyExtractor={item => item.trip_id}
        renderItem={({ item }) => (
          <View>
            {item.endedTripAt ?
              <Card style={styles.card} >
                <CardItem style={{ backgroundColor: 'white' }} button onPress={() => navigation.navigate('Endtrip_details', { item: item })}>
                  <Body style={{ flexDirection: 'row' }}>
                    <Text style={styles.tripstartedtext}>
                      Trip Id :{' '}{item.trip_id}
                    </Text>
                    <Text>{'                                     '}<Ionicons name="chevron-forward-outline"
                      color="#000" size={25}
                    /></Text>
                  </Body>
                </CardItem>
              </Card>
              : null}
          </View>
        )}
      />
    </View>
  );
}

export default Triphistory;
