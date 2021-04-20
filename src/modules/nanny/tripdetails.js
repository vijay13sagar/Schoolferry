import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import styles from '../../components/style';

export default function trip_Details({ route, navigation }) {
  return (
    <View style={styles.cont} >
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
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
    </View>
  );
}