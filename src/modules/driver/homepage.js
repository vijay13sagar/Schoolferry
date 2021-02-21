import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking, StatusBar, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Homescreen = ({ navigation }) => {

  const [trip, setTrip] = useState([
    { id: '1', number: '07:00 AM' },
    { id: '2', number: '12:00 PM' },
    { id: '3', number: '02:00 AM' },

  ]);
  const [pickerValue, setPickerValue] = useState("")


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor='#e91e63'
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />

      <View style={styles.pendingTrips}>
        <Text style={styles.tripsTitleText}>Today's Trips</Text>
        <View style={styles.tripBox}>
          <Text style={styles.Text}>Total Trips - 03 </Text>
          <Text style={styles.Text}>Pending Trips - 03 </Text>

        </View>
      </View>

      <Text style={styles.startTripText}>Click to start trip</Text>

      <FlatList
        style={styles.flatlist}
        data={trip}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardItem button onPress={() => navigation.navigate('Trip Details')}>
              <Body style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>
                  Start Time :
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, fontWeight: '700' }}>
                  {item.number}
                </Text>

                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={styles.icon}

                />

              </Body>
            </CardItem>
          </Card>
        )}
      />
      <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
        <Text style={styles.loginText}>Call Admin</Text>
      </TouchableOpacity>

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
  icon: {
    //justifyContent:'center',
    // alignItems:'center',
    // alignSelf:'flex-end',
    marginLeft: 93,
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
