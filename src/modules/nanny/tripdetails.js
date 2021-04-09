import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity,Linking, StyleSheet, Image } from 'react-native';
import styles from '../../components/style';

export default function trip_Details({ route, navigation }) {
  console.log("this.props", route.params.item);
  return (
    <View style={styles.cont} >
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor='#FF5C00'
      />
        {route.params.item.startedTripAt ? <Text style={styles.startTripText}>Trip Started</Text> : null}
        <Text style={styles.headertext}>Location:</Text>
        <Text style={styles.details}>{route.params.item.location}</Text>
        <Text style={styles.headertext}>Driver ID:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverId}</Text>
        <Text style={styles.headertext}>Driver Name:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverName}</Text>
        <Text style={styles.headertext}>Driver No:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverContact}</Text>
        <Text style={styles.headertext}>Vehicle No:</Text>
        <Text style={styles.details}>{route.params.item.vehicle}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Child List', route.params.item)} >
        <Text style={styles.loginText}>Child List</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:{route.params.item.driverInfo.driverContact}') }}  >
        <Text style={styles.loginText}>Contact Driver</Text>
      </TouchableOpacity> */}
    </View>
  );
}