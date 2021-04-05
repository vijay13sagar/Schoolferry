import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet,  StatusBar, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from "react-native-gesture-handler";
import Loader from '../../components/Loader';
import styles from '../../components/style';

const Homescreen = ({ navigation }) => {
  const [stat,setStat] = useState(false)
  const [data,getData] = useState([])
  const [isloading,setLoading] = useState(false)
  useEffect( () => {
    (async () => {
      setLoading(true)
    const fetchData = navigation.addListener('focus', async () => {
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/nanny/tripdetails/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false)
        console.log('response',responseJson);
        getData( responseJson)
        console.log('responsedata',responseJson[0].endedTripAt);
        if((responseJson[0].endedTripAt==false)){
          setStat(false)
        }else{
          setStat(true)
        }
      })
      .catch(err => {
        console.log('error',err);
      });
    })
    fetchData
    })();
  }, [navigation])

  return (
    <View style={styles.container}>
      <Loader loading = {isloading}/>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />

      <View >{stat ? <Text style={styles.startTripText}>Click to see Trip details</Text> : <Text style={styles.startTripText}>No Completed Trips</Text>}</View>
      <FlatList
        style={styles.flatlist}
        data={data}
        keyExtractor={item => item.trip_id}
        renderItem={({ item }) => (
            <View>
            {item.endedTripAt ?
              <Card style= { styles.card} >
            <CardItem style={{backgroundColor:'white'}} button onPress={() => navigation.navigate('trip_ended',{item:item})}>
              <Body style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>
                Trip Id :
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, fontWeight: '700' }}>
                {item.trip_id}
                </Text>
                <Text style={{marginLeft:50}}></Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={styles.icon1}
                />
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

export default Homescreen;
