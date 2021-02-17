import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet,StatusBar, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';



const Subscriptions = ({navigation}) => {
  const [data, setData] = useState("")
  const [pickerValue, setPickerValue] = useState("")

  useEffect ( () => {    
    fetch(`${Ngrok.url}/api/package/4`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        setData(responseJson)
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
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
      <View style={styles.firstBox}>
        <Text style={styles.planTitleText}>Subscription Plans  </Text>
        <Picker
          selectedValue={pickerValue}
          style={styles.Picker}
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Child 1" value="Child1" />
          <Picker.Item label="Child 2" value="Child2" />
        </Picker>
      </View>
      <View style={{height:320}}>
      <FlatList
        style={styles.flatlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, }}>
            <TouchableOpacity style={styles.flatlistContainer} onPress={()=>navigation.navigate('Plan Details',{item:item})}>
              <Image style={styles.avatar}  source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />

              <Text style={styles.typeOfSubscription}>{item.term}</Text>

              
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.serviceDetails}>Nanny</Text>
                <Text style={styles.price}>  {item.nannycost}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', marginVertical:5, }}>
                <Text style={styles.totalText}>Trip Cost</Text>
                <Text style={styles.totalCost}> - {item.tripcost}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
      <Text style={styles.randomText}>Compulsory nanny service for children till 8 years</Text>

      <View style={styles.addChildContainer}>
        <Text style={styles.addChildText}>To Avail Service For More Children, Click On Add Child</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Add Child')}>
          <Text style={{ fontSize: 15, }} >
            Add child</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.unsubscribeBtn} onPress={()=>navigation.navigate('Pause Plan')}>
        <Text style={{ fontSize: 15, }} >
          Pause subscription</Text>
      </TouchableOpacity>
    </View>

  );
}

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,//#F9F2F2
    backgroundColor: "#F9F2F2",
  },
  firstBox: {
    height: '5%',
    flexDirection: 'row',
    marginTop: 30,
  },
  Picker: {
    height: 30,
    width: "30%",
    marginLeft: 50
  },
  planTitleText: {
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10
  },
  flatlist: {
    flex:1,
    marginTop: 10,
    height:100

  },
  flatlistContainer: {
    flex:1 ,
    width: 220,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#ff5c8d',
    marginBottom: 5,
  },
  avatar: {
    width: "100%",
    height: "50%",
  },
  typeOfSubscription: {
    fontSize: 22,
    fontWeight: "700",
    alignSelf: 'center',
    marginVertical:12
  },
  serviceDetails: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10

  },
  price: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: "700",
  },
  totalText: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 10,

  },
  totalCost: {
    fontSize: 25,
    fontWeight: "700",

  },
  randomText: {
    //marginTop: 5,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    color: "red",
    marginVertical: 5
  },
  addChildContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 0,
    height: 130,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  addChildText: {
    fontSize: 17,
    fontWeight: '700',
    padding: 10,
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 10,
  },
  unsubscribeBtn: {
    width: "75%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop:10,
    //marginBottom:15
  },


})