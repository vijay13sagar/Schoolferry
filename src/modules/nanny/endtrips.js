import * as React from 'react';
import { Text, View, StatusBar, TouchableOpacity,FlatList, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../components/style';

export default function trip_Details({ route, navigation }) {
  console.log("this.props", route.params.item);
  return (
    <View style={styles.container} >
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor='#FF5C00'
      />
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
      <Text style={styles.sidehead} >List of Children:</Text>
          <FlatList
            data={route.params.item.childList}
            keyExtractor={(item) => item.childId}
            renderItem={({ item }) => (
        <TouchableOpacity style={styles.loginBtn} onPress = {()=>navigation.navigate('oldChild Details',{item:item})}>
          <Text style={styles.loginText}>{ item.childId } , {item.childName}</Text>
        </TouchableOpacity>
            )}
          />
    </View>
  );
}





