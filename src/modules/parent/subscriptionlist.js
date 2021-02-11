import React, { useState } from 'react';
import { Text, View, StyleSheet,StatusBar, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';


const Subscriptions = ({navigation}) => {
  const [data, setData] = useState([
    { driverPrice: '499', nannyPrice: '399', othersPrice: '299', totalPrice: '1,999', id: '1', type: 'Monthly', nanny: 'Nanny Cost:', driver: 'Driver Cost', others: 'Others:', total: 'Total' },
    { driverPrice: '499', nannyPrice: '399', othersPrice: '299', totalPrice: '7,499', id: '2', type: 'Quaterly', nanny: 'Nanny Cost:', driver: 'Driver Cost', others: 'Others:', total: 'Total' },
    { driverPrice: '499', nannyPrice: '399', othersPrice: '299', totalPrice: '13,999', id: '3', type: 'Semi Annually', nanny: 'Nanny Cost:', driver: 'Driver Cost', others: 'Others:', total: 'Total' },
    { driverPrice: '499', nannyPrice: '399', othersPrice: '299', totalPrice: '21,999', id: '4', type: 'Yearly', nanny: 'Nanny Cost:', driver: 'Driver Cost', others: 'Others:', total: 'Total' }

  ])
  const [pickerValue, setPickerValue] = useState("")


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
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
      <View style={{height:350}}>
      <FlatList
        style={styles.flatlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, }}>
            <TouchableOpacity style={styles.flatlistContainer} onPress={()=>navigation.navigate('Plan Details')}>
              <Image style={styles.avatar}  source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />

              <Text style={styles.typeOfSubscription}>{item.type}</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.serviceDetails}>{item.driver}</Text>
                <Text style={styles.price}>  {item.driverPrice}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.serviceDetails}>{item.nanny}</Text>
                <Text style={styles.price}>  {item.nannyPrice}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.serviceDetails}>{item.others}</Text>
                <Text style={styles.price}>    {item.othersPrice}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical:5, }}>
                <Text style={styles.totalText}>{item.total}</Text>
                <Text style={styles.totalCost}> - {item.totalPrice}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
      <Text style={styles.randomText}>Swipe Left And See Our special plans For You</Text>

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
    height:200

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
    marginBottom: 5
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
    fontSize: 30,
    fontWeight: "700",
    marginLeft: 10,

  },
  totalCost: {
    fontSize: 30,
    fontWeight: "700",

  },
  randomText: {
    //marginTop: 5,
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '700',
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
    marginTop: 20,
  },
  unsubscribeBtn: {
    width: "75%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop:5,
    //marginBottom:15
  },


})