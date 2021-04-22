import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AddressPickup from '../../components/addresspickup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDistance, getPreciseDistance} from 'geolib';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';

const location = ({navigation}) => {
  const [pincode, setPincode] = useState('');
  const [origin, setOrigin] = useState({
    latitude1: '0 ',
    longitude1: '0 ',
  });
  const [destination, setDestination] = useState({
    latitude2: '0',
    longitude2: '0 ',
  });
  const [Distance, setDistance] = useState(0)
  const [schoolAddress, setSchoolAddress] = useState(' ');
  const [residenceAddress, setResidenceAddress] = useState(' ');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [{error}, setError] = useState(' ');
  const [isLoading, setLoading] = useState(false);

  const fetchCoords = (lat, lng, name, address, schooladdress) => {
    setOrigin({
      latitude1: lat,
      longitude1: lng,
    });
    setSchoolAddress(schooladdress);
  };

  const fetchDestinationCoords = (lat, lng, name, address, schooladdress) => {
    setDestination({
      latitude2: lat,
      longitude2: lng,
    });
    setResidenceAddress(schooladdress);
  };

  const modalButtonHandler = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Home');
  };

  const calculateDistance = () => {
    var dis = getDistance(
      {latitude: origin.latitude1, longitude: origin.longitude1},
      {latitude: destination.latitude2, longitude: destination.longitude2},
    );
    let finalDistance = dis / 1000;
    setDistance(finalDistance);
    return finalDistance;
  };

  const submitHandler = async () => {

    if (!schoolAddress || !residenceAddress || !pincode) {
      setError({error: 'Please enter all fields'});
    } else if (pincode.length != 6) {
      setError({error: 'Please enter valid pincode'});
    } else {
      setLoading(true);
      const responsePincode = await fetch(
        `${Ngrok.url}/api/locations/pincode/${pincode}`,
      );
     
      const responseSchool = await fetch(
        `${Ngrok.url}/api/locations/schools/${schoolAddress}`,
      );

      setLoading(false);
      if (responsePincode.status == 200 && responseSchool.status == 200) {
        setModal1Visible(true);
      } else {
        setModalVisible(true);
      }
    }
  };

  const modal1ButtonHandler = async () => {
    const dis = await calculateDistance();
    navigation.navigate('Subscriptions', {
      screen: 'Add Child',
      params: {
        distance: dis,
        schooladdress: schoolAddress,
        homeaddress: residenceAddress,
      },
    });

    setModal1Visible(!modal1Visible);
    navigation.pop();
  };

  return (
    <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled">
      <Loader loading={isLoading} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer1}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody1}>
            <Text style={styles.message2}>Sorry, Currently Unavailable</Text>
            <Text style={styles.newsText1}>
              We will get back to you once we start service at your area
            </Text>

            <TouchableOpacity
              style={styles.closeModal}
              onPress={modalButtonHandler}>
              <Text style={styles.loginText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modal1Visible}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modal1Visible) => setModal1Visible(!modal1Visible)}
          />
          <View style={styles.modalBody1}>
            <Text style={styles.message2}>Great! Service is available</Text>
            <Text style={styles.newsText1}>
            Please add child details
            </Text>

            <TouchableOpacity
              style={styles.closeModal}
              onPress={modal1ButtonHandler}>
              <Text style={styles.loginText}>Add Child</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AddressPickup
        placeholderText=" Enter School Name"
        fetchAddress={fetchCoords}
      />
      <View style={{marginBottom: 16}} />
      <AddressPickup
        placeholderText=" Enter Residence Address"
        fetchAddress={fetchDestinationCoords}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.TextInput3}
        maxLength={6}
        placeholder="Enter Pincode"
        placeholderTextColor="#929292"
        onChangeText={(pincode) => setPincode(pincode)}
      />
      <Text style={styles.error}>{error}</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={submitHandler}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default location;
