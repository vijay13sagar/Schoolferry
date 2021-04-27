import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../../components/style';

var height = Dimensions.get("window").height;

const showplanScreen = ({ route, navigation }) => {
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
          setisLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
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
        return item.childName
          .toLowerCase()
          .includes(selectedValue.toLowerCase());
      })
      : [];

  const verifyHandler = () => {
    setModalVisible(false);
    navigation.navigate('location');
  };

  const onpressSame = () => {
    setModalVisible(false);
    navigation.navigate('Add Child', {
      distance: Boolean(value1.length) && value1[0].distance,
      schooladdress: Boolean(value1.length) && value1[0].address,
    });
  };

  return isLoading ? null : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={{ ...styles.modalBody1, height: 220 }}>
            <Text style={{ ...styles.message1, fontSize: 18 }}>
              In case location of residence/school is different , plese verify.
            </Text>
            <TouchableOpacity style={{ ...styles.closeModal, height: 35, marginTop: 25 }} onPress={verifyHandler}>
              <Text style={styles.loginText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 5 }}
              onPress={onpressSame}>
              <Text
                style={{
                  color: '#1E90FF',
                  textDecorationLine: 'underline',
                  fontSize: 17,
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

      <View style={{ height: height * 0.45 }}>
        <FlatList
          style={{ ...styles.flatlist, marginTop: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={Boolean(value1.length) && value1[0].plans}
          keyExtractor={(item, index) => {
            return item.term;
          }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
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
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Trip Cost</Text>
                  <Text style={styles.price}> - ₹ {item.tripcost}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>Nanny</Text>
                  <Text style={styles.price}> - ₹ {item.nannycost}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.serviceDetails}>GST</Text>
                  <Text style={styles.price}> - ₹ {item.gst}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalCost}> - ₹ {item.total}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {Boolean(value1.length) && value1[0].status == 'subscribed' ? (
        <Text style={{ color: '#ce1212', marginHorizontal: 5, marginTop: 10, fontWeight: '700' }}>
          {' '}
          * Nanny service is compulsory for children below 9 years.
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
          <Text style={styles.loginText}>Add child</Text>
        </TouchableOpacity>
      </View>

      {Boolean(value1.length) && value1[0].status == 'subscribed' ? (
        <TouchableOpacity
          style={styles.unsubscribeBtn}
          onPress={() =>
            navigation.navigate('Pause Plan', {
              childid: Boolean(value1.length) && value1[0].childId,
            })
          }>
          <Text style={styles.loginText}>Pause subscription</Text>
        </TouchableOpacity>
      ) : null}
      {/*Boolean(value1.length) && value1[0].status == 'subscribed' ? (
        <TouchableOpacity
          style={{...styles.logoutBtn, width:'75%',marginTop:15,marginBottom:15,}}
          onPress={() => navigation.navigate('Pause Plan',{

            childid: Boolean(value1.length) && value1[0].childId,     
          })}>
          <Text style={styles.loginText}>Cancel subscription</Text>
        </TouchableOpacity>
        ) : null*/}
    </ScrollView>
  );
};

export default showplanScreen;
