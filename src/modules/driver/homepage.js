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
 
      <View style={styles.pendingTrips}>
        <Text style={styles.tripsTitleText}>Today's Trips</Text>
        <Text style={styles.startTripText1}>Click to see Trip details</Text>
      </View>
      <FlatList
        style={styles.flatlist}
        data={data}
        keyExtractor={item => item.trip_id}
        renderItem={({ item }) => (
          <Card style= { item.endedTripAt ? styles.card2 :styles.card}>
            <CardItem style={item.endedTripAt ? {backgroundColor:'lightgrey'}:{backgroundColor:'white'}} button disabled={item.endedTripAt ? true : false} onPress={() => navigation.navigate('Trip Details',{item:item})}>
              <Body style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>
                Trip Id :
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, fontWeight: '700' }}>
                {item.trip_id}
                </Text>
                <Text style={{marginLeft:40}}>
                  {item.endedTripAt ?<Text style={{color:'white',fontWeight:'700',fontSize:17}}>Trip Completed</Text> : null}
                </Text>
                {item.endedTripAt ? null : <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:"35%"}}
                />}

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

