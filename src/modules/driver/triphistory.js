import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking, StatusBar, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';

const Homescreen = ({ navigation }) => {
  
  const [data,getData] = useState([])
  useEffect( () => {
    const fetchData = navigation.addListener('focus', async () => {
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/driver/tripdetails/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('response',responseJson);
        getData( responseJson)
        console.log('responsedata',data);
      })
      .catch(err => {
        console.log('error',err);
      });
    })
    fetchData
    }, [navigation])
  const [pickerValue, setPickerValue] = useState("")

  return (
    <View style={styles.container}>
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

      <Text style={styles.startTripText}>Click to see Trip details</Text>

      <FlatList
        style={styles.flatlist}
        data={data}
        keyExtractor={item => item.trip_id}
        renderItem={({ item }) => (
            <View>
            {item.endedTripAt ?
              <Card style= { styles.card} >
            <CardItem style={{backgroundColor:'white'}} button onPress={() => navigation.navigate('Endtrip_details',{item:item})}>
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
                  style={styles.icon}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  pendingTrips: {
    backgroundColor: "#fff",
    height: 140,
    marginTop: 50,
    width: '90%',
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10

  },
  tripsTitleText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "bold"
  },
  tripBox: {
    flex: 1,
    marginTop: 20,
    marginBottom:5,

  },
  Text: {
    margin: 4,
    fontSize: 18,
    alignSelf: "center"

  },
  startTripText: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,

  },
  CallBtn: {
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32cd32",
    alignSelf: 'center',
    marginBottom: 50,
  },
  loginText: {
    fontSize: 15,

  },
  card: {
    width: '80%',
    alignSelf: 'center',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',

  },
  card2: {
    width: '80%',
    alignSelf: 'center',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'lightgrey'
  },
  icon: {
    //justifyContent:'center',
    // alignItems:'center',
    // alignSelf:'flex-end',
    marginLeft: 100,
  }

})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    //backgroundColor:'transparent',
    height: 50,
    width: '70%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    alignSelf: 'center',
    marginTop: 50,
  },
  placeholder: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
