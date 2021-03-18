import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const showplanScreen = ({route, navigation}) => {
  const [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState([]);
  const [selectedValue, setValue] = useState('');
  const [isLoading, setisLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        let token = await AsyncStorage.getItem('token');
        try {
          const res = await axios(
            `${Ngrok.url}/api/parent/detail/childlist/${token}`,
          );
          setPickerValue(res.data);
          setValue(res.data[0].childName);
          // console.log('selectedvalue:', selectedValue)
          console.log('subsciption refresh:', res.data[0].childName);
          setisLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();

      //return null;
    }, []),
  );

  const myUsers = () => {
    return (
      pickerValue &&
      pickerValue.map((myValue) => {
        return (
          <Picker.Item
            label={myValue.childName}
            value={myValue.childName}
            key={myValue.childId}
          />
        );
      })
    );
  };

  const value1 =
    pickerValue.length && selectedValue
      ? pickerValue.filter((item) => {
          //console.log('check value',pickerValue, selectedValue)
          return item.childName
            .toLowerCase()
            .includes(selectedValue.toLowerCase());
        })
      : [];

  //console.log('status', value1[0].childId);

  const verifyHandler = () => {
    setModalVisible(false);
    navigation.navigate('location');
  };

  const onpressSame = () => {
    setModalVisible(false);
    navigation.navigate('Add Child', {
      distance: Boolean(value1.length) && value1[0].distance,
      schooladdress: Boolean(value1.length) && value1[0].address,
      // homeaddress: Homeaddress,
    });
  };

  return isLoading ? null : (
    <ScrollView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody}>
            <Text style={styles.message}>
              In case location of residence/school is different , plese verify.
            </Text>

            <TouchableOpacity style={styles.closeModal} onPress={verifyHandler}>
              <Text style={{fontSize: 17}}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 5}}
              onPress={onpressSame}>
              <Text
                style={{
                  color: '#1E90FF',
                  textDecorationLine: 'underline',
                  fontSize: 19,
                }}>
                It's same
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.firstBox}>
        <Text style={styles.planTitleText}>Subscription Plans </Text>

        <Picker
          selectedValue={selectedValue}
          style={styles.Picker}
          onValueChange={(value) => {
            setValue(value);
          }}>
          {myUsers()}
        </Picker>
      </View>
      <View style={{height: 340}}>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={Boolean(value1.length) && value1[0].plans}
          keyExtractor={(item) => item.childId}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.flatlistContainer}
                onPress={() =>
                  navigation.navigate('Plan Details', {
                    item: item,
                    schooladdress: Boolean(value1.length) && value1[0].address,
                    childid: Boolean(value1.length) && value1[0].childId,
                  })
                }>
                <Image
                  style={styles.avatar}
                  source={{
                    uri:
                      'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg',
                  }}
                />

                <Text style={styles.typeOfSubscription}>{item.term}</Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>Trip Cost</Text>
                  <Text style={styles.price}> - ₹ {item.tripcost}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>Nanny</Text>
                  <Text style={styles.price}> - ₹ {item.nannycost}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>GST</Text>
                  <Text style={styles.price}> - ₹ {item.gst}</Text>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalCost}> - ₹ {item.total}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {Boolean(value1.length) && value1[0].status == 'subscribed' ? (
        <Text style={styles.randomText}>
          Compulsory nanny service for children till 8 years
        </Text>
      ) : (
        <Text style={styles.randomText2}>
          Unsusbcribed Child. select a plan to get subscribed
        </Text>
      )}

      <View style={styles.addChildContainer}>
        <Text style={styles.addChildText}>
          To Avail Service For More Children, Click On Add Child
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => setModalVisible(true)}>
          <Text style={{fontSize: 15}}>Add child</Text>
        </TouchableOpacity>
      </View>

      {Boolean(value1.length) && value1[0].status == 'subscribed' ? (
        <TouchableOpacity
          style={styles.unsubscribeBtn}
          onPress={() => navigation.navigate('Pause Plan',{

            childid: Boolean(value1.length) && value1[0].childId,     
          })}>
          <Text style={{fontSize: 15}}>Pause subscription</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

export default showplanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
  },
  firstBox: {
    height: 32,
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  Picker: {
    height: 30,
    width: 140,
    marginLeft: 30,
  },
  planTitleText: {
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10,
  },
  flatlist: {
    flex: 1,
    marginTop: 15,
    height: 150,
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
    width: '100%',
    height: '50%',
  },
  typeOfSubscription: {
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 2,
  },
  serviceDetails: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  price: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  totalText: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },
  totalCost: {
    fontSize: 22,
    fontWeight: '700',
  },
  randomText: {
    //marginTop: 5,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    color: 'red',
    marginVertical: 5,
  },
  addChildContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    height: 130,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addChildText: {
    fontSize: 17,
    fontWeight: '700',
    padding: 10,
    textAlign: 'center',
  },
  loginBtn: {
    width: '50%',
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    marginTop: 10,
  },
  unsubscribeBtn: {
    width: '75%',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c8d',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom:20,
  },
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  modalBody: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 280,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
  },
  randomText2: {
    fontSize: 19,
    fontWeight: '700',
    color: '#4169e1',
    marginVertical: 8,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
