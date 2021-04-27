import React, { useState} from "react";
import { Text, View, TouchableOpacity, Linking, StatusBar, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const Homescreen = ({ navigation }) => {
  const [data,getData] = useState([])
  const [isloading,setLoading] = useState(false)
  useFocusEffect( 
    React.useCallback(() => {
      setLoading(true)
    const fetchData = async () => {
    let token = await AsyncStorage.getItem('token')
    axios
    .get(`${Ngrok.url}/api/driver/tripdetails/${token}`)
    .then(function (response) {
      setLoading(false)
      getData( response.data)
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
    });
    }
    fetchData();

  }, []),
  );
  return (
    <View style={styles.container}>
      <Loader loading = {isloading}/>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      <View style={styles.headingcontainer}>
        <Text style={styles.tripsTitleText}>Today's Trips</Text>
        <Text style={styles.startTripText}>Click to see Trip details</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.trip_id}
        renderItem={({ item }) => (
          <Card style= { item.endedTripAt ? styles.card2 :styles.card}>
            <CardItem style={item.endedTripAt ? {backgroundColor:'lightgrey'}:{backgroundColor:'white'}} button disabled={item.endedTripAt ? true : false} onPress={() => navigation.navigate('Trip Details',{item:item})}>
              <Body style={{ flexDirection: 'row' }}>
                <Text style={styles.tripstartedtext}>
                Trip Id :{' '}{item.trip_id}
                </Text>
                  {item.endedTripAt ?<Text style={styles.tripendedtext}>{'     '}Trip Completed</Text> 
                  : <Text >
                        {item.startedTripAt ? <Text style={styles.tripstartedtext}>{'     '}Trip Started</Text> 
                        : <Text>{'                                '}<Ionicons name="chevron-forward-outline"
                          color="#000" size={25}
                        /></Text>}
                      </Text>}
              </Body>
            </CardItem>
          </Card>
        )}
      />
      <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
        <Text style={styles.loginText}>Call Admin   <Ionicons name="call"
                  color="white" size={20}
                /></Text>
      </TouchableOpacity>
      
    </View>
  );
}

export default Homescreen;

