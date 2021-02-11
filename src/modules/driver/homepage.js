import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Homescreen = ({ navigation }) => {

  const [trip, setTrip] = useState("");
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
          <Text style={styles.Text}>Pending Trips - </Text>
          <Text style={styles.Text}>02</Text>
        </View>
      </View>
      <Picker
      selectedValue={pickerValue}
          style={styles.Picker}
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Trip 1" value="Trip1" />
          <Picker.Item label="Trip 2" value="Trip2" />
        </Picker>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Trip Details")}  >
        <Text style={styles.loginText}>Start Trip</Text>
      </TouchableOpacity>
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
    height: '20%',
    marginTop: 150,
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
    flexDirection: 'row',
    marginTop: 20,

  },
  Text: {
    margin: 4,
    fontSize: 18,
    alignSelf: "center"

  },
  Picker: {
     width:"75%",
     marginVertical:10,
     borderRadius:10,
     height:30,
     borderWidth:1,
     alignContent:"center",
     alignSelf:"center",
     
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#ff5c8d",
    alignSelf: 'center',

  },
  CallBtn: {
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 'auto',
    backgroundColor: "#32cd32",
    alignSelf: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 15,

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
