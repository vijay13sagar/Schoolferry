import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const addsubscreen = ({navigation}) =>  {
    return (
      <ScrollView style={styles.container} >
      
          <View style={styles.body}>
            <View style={styles.slogans}>
              <Text style={{fontWeight:'bold',fontSize:19,alignSelf:'center',marginTop:10,}}>We Provide</Text>
              <Text style={styles.sidehead}>Easy Tracking</Text>
              <Text style={styles.content}>With advanced tracking algorithms, you can now track live location of the vehicle taking your little ones to school.</Text>
              <Text style={styles.sidehead}>Highly Flexible</Text>
              <Text style={styles.content}>Schoolferry is not like ordinary school bus service provided by schools, we provide you flexibility in booking and cancellation options. You can pause your subscription at anytime and we will provide you service for days that you paused subscription for..</Text>
              <Text style={styles.sidehead}>Low Cost</Text>
              <Text style={styles.content}>In the world of price hikes on everything, we are here with exceptionally low price packages, join today for jaw-dropping value for money packages.</Text>
              <Text style={styles.sidehead}>Highly Safe</Text>
              <Text style={styles.content}>With a team of highly experienced drivers and advanced location tracking app, schoolferry provide you safety like never before. Nannies are also provided to take care of your little ones.</Text>
            </View>
            <Text style={{fontSize:18,marginTop:15,textAlign:'center', }} >To subscribe to a plan , check service availability at your area and get started.</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('location')}>
              <Text style={{fontSize:16,}}>Check availability</Text>
            </TouchableOpacity>
            
          </View>
      </ScrollView>
    );
  }

export default addsubscreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  sidehead:{
    fontWeight:'bold',
    marginLeft:8,
    alignSelf:'flex-start',
    justifyContent:'space-around',
    fontSize:18
  },
  content:{
    marginLeft:13,
    alignSelf:'flex-start',
    justifyContent:'space-around',
    marginVertical:2,
    fontSize:15

  },
  slogans:{
    borderWidth: 1,
      borderColor: '#b0003a',
      borderRadius: 10,
      width: "85%",
      height: 490,
      padding:2,
      backgroundColor:'#ffe4e1',   //"#C4C4C4",
      marginVertical: 5,

  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  body: {
    justifyContent:'center',
    alignContent:'center',
    alignItems: 'center',
  },
  textview: {
    margin: 20,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 30,
  },
  details: {
    height: 40,
    margin:10,
    backgroundColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  details2: {
    height: 200,
    backgroundColor: "grey",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 15,
  },

});
