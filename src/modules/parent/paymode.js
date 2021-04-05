import React from "react";
import { Text, View,Image, StyleSheet, StatusBar} from 'react-native';

import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Homescreen = ({ route,navigation }) => {
  const childid= route.params.childid;
  return (
    <View style={styles.container}>

      <View style={styles.pendingTrips}>
        <Text style={styles.tripsTitleText}>Select a Payment Option</Text>
      </View>
      <View style={{marginVertical:20,}}>
          <Card style={styles.card1}>
            <CardItem button onPress={() => navigation.navigate('Upiscreen',{
              maxDate:route.params.maxDate,
              tomorrow:route.params.tomorrow,
              f:route.params.f,
              costly:route.params.costly
            })}>
              <Body style={{ flexDirection: 'row' }}>
              {/* ./src/assets/UPI1.png */}
              <Image  style={styles.payicon} source={require('../../assets/UPI1.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700',marginLeft:100 }}>
                Pay with UPI :
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
              navigation.navigate('PaymentScreen',{
              maxDate:route.params.maxDate,
              tomorrow:route.params.tomorrow,
              f:route.params.f,
              costly:route.params.costly,
              childid:childid})}}>
              <Body style={{ flexDirection: 'row' }}>
              <Image  style={styles.payicon} source={require('../../assets/card.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700',marginLeft:100 }}>
                Pay with Card :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:60}}
                />
              </Body>
            </CardItem>
          </Card>
          </View>
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
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "black",
    //marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
    marginTop: 50
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
