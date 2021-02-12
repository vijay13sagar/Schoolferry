import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ngrok from '../../constants/ngrok';


const HomeScreen = ({ navigation }) => {

  /*function validateLocation() {
    fetch(`${Ngrok.url}/api/login`, {
      "method": "POST",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        schoolname: schoolname,
        pincode: pincode,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (response.ok) {
          //navigation.navigate('Parent Interface')
          //alert("Login Sucessful")
        } else {
          alert('Login failed ')
        }
      })
      .catch(err => {
        console.log(err);
      });
  }*/

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.980120875177654,
          longitude: 77.5876170887363,
          latitudeDelta: 0.0922 * 4,
          longitudeDelta: 0.0421 * 3,
        }}

      >
        <Marker
          coordinate={{
            latitude: 12.919095107848468,
            longitude: 77.75171683914937
          }}
          image={require('../../assets/marker.png')}
          title={"Basil Woods International School"}
        //description={marker.description}
        />
        <Marker
          coordinate={{
            latitude: 12.899742142630496,
            longitude: 77.65185291031341
          }}
          image={require('../../assets/marker.png')}
          title={"SVR Chinmaya School"}
        //description={marker.description}
        />
        <Marker
          coordinate={{
            latitude: 12.91398054034311,
            longitude: 77.63500419682072
          }}
          image={require('../../assets/marker.png')}
          title={"Lawrence High School (ICSE)"}
        //description={marker.description}
        />
        <Marker
          coordinate={{
            latitude: 12.905044463527954,
            longitude: 77.67498829682062
          }}
          image={require('../../assets/marker.png')}
          title={"The International School Banglore"}
        //description={marker.description}
        />
      </MapView>
      <View style={styles.textview}>
        <Text style={styles.text}>Click to check service availability at your area</Text>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("location")}>
        <Text style={styles.loginText}>Check Availability</Text>
      </TouchableOpacity>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
  map: {
    height: '68%',

    // marginBottom: 20,
  },
  textview: {

  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 30,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    backgroundColor: "#ff5c8d",
    // marginVertical: 20
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    // fontWeight:'700'
  }

})