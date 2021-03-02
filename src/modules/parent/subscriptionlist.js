import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';

const Subscriptions = ({ route, navigation }) => {
  const [data, setData] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState()
  const [selectedValue,setValue] = useState()

  const [childid,setChild] = useState (route.params.childID)
  const skool = route.params.school;
  const Homeaddress = route.params.homeaddress;
  const distance = route.params.distance 

    useEffect (  () => { 
     
     async function fetchData () { 
      let token = await childid  
     fetch(`${Ngrok.url}/api/package/${token}`, {
       "method": "GET",
       "headers": {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
     })
       .then(response => response.json())
       .then(responseJson => {
        // console.log(responseJson);
         setData(responseJson)
       })
       .catch(err => {
         console.log(err);
       });
      }

      fetchData();
   }, [])
  

  
 
   /*const GetData = async () => {
     let token = await AsyncStorage.getItem('token')
     console.log(token)
     try {
       axios({
         method: 'GET',
          url: `${Ngrok.url}/api/parent/childlist/P007`,
        // url: 'https://jsonplaceholder.typicode.com/users?_limit=2',
         "headers": {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         }
 
       })
         .then(function (response) {
            console.log(response.data.childList)
           setPickerValue(response.data.childList)
           

           
 
         })
     }
     catch (error) {
       console.log("errordetails", error);
     }
   }
 
   const myUsers = () => {
    // console.log(pickerValue)
    
          return pickerValue && pickerValue.map((myValue) => {
          return (
            <Picker.Item label={myValue.name}
              value={myValue} key={myValue.id}/>
          )
        }); 
   }*/

  const verifyHandler = () => {
    setModalVisible(false)
    navigation.navigate('location')
  }

  const onpressSame = () => {
      setModalVisible(false)
      navigation.navigate('Add Child', {
      distance: distance,
      schooladdress: skool,
      homeaddress: Homeaddress,
    })
  }


  return (
    <View style={styles.container}>
      <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <Ionicons name="close-circle-outline"
            color="#fff" size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody}>

            <Text style={styles.message}>In case location of residence/school is different , plese verify.</Text>

            <TouchableOpacity style={styles.closeModal}
              onPress={verifyHandler}
            >
              <Text style={{ fontSize: 17, }}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 5, }}
              onPress={onpressSame} >
              <Text style={{ color: '#1E90FF', textDecorationLine: 'underline', fontSize: 19, }}>
                It's same
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <View style={styles.firstBox}>
        <Text style={styles.planTitleText}>Subscription Plans  </Text>

      </View>
      <View style={{ height: 350, marginTop:15, }}>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ flex: 1, }}>
              <TouchableOpacity style={styles.flatlistContainer} onPress={() => navigation.navigate('Plan Details', {
                item: item,
                schooladdress: skool,
                childid:route.params.childID,
              })}>
                <Image style={styles.avatar} source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />
                <Text style={styles.typeOfSubscription}>{item.term}</Text>


                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Nanny</Text>
                  <Text style={styles.price}> - {item.nannycost}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Gst</Text>
                  <Text style={styles.price}> - {item.gst}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Trip Cost</Text>
                  <Text style={styles.price}> - {item.tripcost}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5, }}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalCost}> - {item.total}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.randomText}>Compulsory nanny service for children till 8 years</Text>

      <View style={styles.addChildContainer}>
        <Text style={styles.addChildText}>To Avail Service For More Children, Click On Add Child</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => setModalVisible(true)}>
          <Text style={{ fontSize: 15, }} >
            Add child</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
    marginTop: 20,
    width:'100%',
  },
  planTitleText: {
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10
  },
  flatlist: {
    flex: 1,

  },
  flatlistContainer: {
    flex: 1,
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
    marginTop: 8,
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
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,

  },
  totalCost: {
    fontSize: 22,
    fontWeight: "700",

  },
  randomText: {
    //marginTop: 5,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    color: "red",
    marginTop: 5
  },
  addChildContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 25,
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
    marginTop: 10,
    //marginBottom:15
  },
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    //height: '50%',
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 10
  },
  modalBody: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 280,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center'

  },
  message: {
    fontSize: 22,
    textAlign: 'center',
    //marginTop: 30
    color: '#000',
    fontWeight: '600',
    padding: 7,
  },

  closeModal: {
    borderRadius: 10,
    width: 180,
    height: 40,
    marginTop: 40,
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },


})