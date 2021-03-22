import React from "react";
import { Text, View,Image,Alert, StyleSheet,TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

const Homescreen = ({ navigation }) => {
  const onPressLogout = async () => {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
      AsyncStorage.removeItem('token');
      console.log("working");
      navigation.replace('Login');
      Alert.alert('You have been logged out');
    } catch (error) {
      console.error('Error clearing app data.', error);
    }
    //AsyncStorage.removeItem('token');
    //window.localStorage.clear();
    //AsyncStorage.clear()

  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#e91e63"
        translucent={false}
      />
      <ScrollView>
      <View style={{alignSelf:'center',alignItems:'center'}}>
        {/* <Text style={styles.tripsTitleText}>Management</Text> */}
        <Image  style={styles.logo} source={require('../../assets/analytics.png')} />
      </View>
      <View style={{marginVertical:20,}}>
          <Card style={styles.card1}>
            <CardItem button onPress={() => navigation.navigate('RevStats')}>
              <Body style={{ flexDirection: 'row' }}>
              {/* ./src/assets/UPI1.png */}
              <Image  style={styles.payicon} source={require('../../assets/RevenueIcon.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700',marginLeft:100 }}>
                Revenue Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:70}}
                />
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.card1}>
            <CardItem button onPress={() =>{
              navigation.navigate('SubStats')}}>
              <Body style={{ flexDirection: 'row' }}>
              <Image  style={styles.payicon} source={require('../../assets/StatsIcon.png')} /> 
                <Text style={{ fontSize: 17, fontWeight: '700',marginLeft:100 }}>
                Subscription Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:38}}
                />
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.card1}>
            <CardItem button onPress={() =>{
              navigation.navigate('TripStats')}}>
              <Body style={{ flexDirection: 'row' }}>
              <Image  style={styles.payicon} source={require('../../assets/TripIcon.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700',marginLeft:100 }}>
                Trip Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:102}}
                />
              </Body>
            </CardItem>
          </Card>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
          </ScrollView>
    </View>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  logo: {
    marginVertical: 20,
    width:260,
    height:220,
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
    marginTop: 20,
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
  card1: {
    width: '90%',
    alignSelf: 'center',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payicon: {
    width: 70,
    height: 70,
    //borderRadius: 63,
    //borderWidth: 1,
    //borderColor: "black",
    //marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
  },

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
