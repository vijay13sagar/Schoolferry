import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {v4 as uuidv4} from 'uuid';

export default function addchild({route, navigation}) {
  const [CN, setCN] = useState('');
  const [CA, setCA] = useState('');
  const [ST, setST] = useState('');
  const [ET, setET] = useState('');
  const [SA, setSA] = useState(route.params.schooladdress);
  const [HA, setHA] = useState(route.params.homeaddress);
  const [{value_error}, setError] = useState('');
  const [pickerValue, setPickerValue] = useState();
  const [visible, setVisible] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [textflag, setTextFlag] = useState(false);
  const [textflag2, setTextFlag2] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateFlag, setDateFlag] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();
  const [type, setType] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState();
  const [image, setImage] = useState(
    'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png',
  );

  const distanceCal = route.params.distance;

  const validateFunction = () => {
    if (!CN || !CA || !ST || !ET || !SA || !HA) {
      setError({value_error: 'Fields Cannot be Empty'});
      return false;
    } else {
      return true;
    }
  };

  const handlePress = async () => {
    let token = await AsyncStorage.getItem('token');
    if (validateFunction()) {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/child`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          name: CN,
          dob: CA,
          bloodgroup: pickerValue,
          photourl: url,
          address: HA,
          school: SA,
          starttime: ST,
          endtime: ET,
          distance: Number(distanceCal),
          parentid: token,
        },
      })
        .then(function (response) {
          setLoading(false);
          if (response.status == 200) {
            setCN('');
            setCA('');
            setPickerValue('');
            setError('');
            setST('');
            setET('');
            setTextFlag(false);
            setTextFlag2(false);
            setDateFlag(false);
            navigation.navigate('Subscription_list', {
              childID: response.data,
              school: SA,
            });
          } else {
            setToast(true);
            setType(ToastMessage.failure);
            SetMessage(ToastMessage.message5);
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.error(error);
          setToast(true);
          setType(ToastMessage.failure);
          SetMessage(ToastMessage.message5);
        });
    }
    setToast(false);
  };

  const handleConfirm = (date) => {
    if (timerValue == '1') {
      setST(moment(date).format('HH:mm'));
      setTimerValue(0);
      setTextFlag(true);
    } else if (timerValue == '2') {
      setET(moment(date).format('HH:mm'));
      setTimerValue(0);
      setTextFlag2(true);
    }
    setVisible(false);
  };

  const handleDatePicked = (date) => {
    setCA(moment(date).format('DD-MM-yyyy'));
    setDateFlag(true);
    setDatePickerVisible(false);
  };

  const imagePickerHandler = () => {
    setModalVisible(true);
  };

  const gallery = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
      upload(image.path);
    });
    setModalVisible(false);
  };

  const Camera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
      upload(image.path);
    });
    setModalVisible(false);
  };

  const upload = (value) => {
    const uploadUri = value;
    let imageName = `Child/Profile/${uuidv4()}`;
    storage()
      .ref(imageName)
      .putFile(uploadUri)
      .then(async (snapshot) => {
        let imageRef = storage().ref(imageName);
        const url = await imageRef.getDownloadURL().catch((error) => {
          throw error;
        });
        if (url) {
          setToast(true);
          setType(ToastMessage.success);
          SetMessage(ToastMessage.ImageSuccessful);
        } else {
          setToast(true);
          setType(ToastMessage.failure);
          SetMessage(ToastMessage.message5);
        }
        setUrl(url);
      })
      .catch((e) => {
        setToast(true);
        setType(ToastMessage.failure);
        SetMessage(ToastMessage.message5);
      });
    setToast(false);
  };

  return (
    <ScrollView style={styles.container}>
      {showtoast ? <ToastComponent type={type} message={message} /> : null}
      <Loader loading={isLoading} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody1}>
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 5}}
              onPress={Camera}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 19,
                }}>
                Open Camera{' '}
                <Ionicons
                  name="camera"
                  color="#FF5C00"
                  size={25}
                  style={styles.icon}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 20}}
              onPress={gallery}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 19,
                }}>
                Choose From Gallery{' '}
                <Ionicons
                  name="folder"
                  color="#FF5C00"
                  size={25}
                  style={styles.icon}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        is24Hour={true}
        display="spinner"
      />
      <DateTimePicker
        isVisible={datePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={() => setDatePickerVisible(false)}
        display="spinner"
        maximumDate={new Date(2021, 11, 31)}
        minimumDate={new Date(2002, 0, 1)}
      />
      <TouchableOpacity style={styles.profileView} onPress={imagePickerHandler}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 50}}
          source={{uri: image}}
        />
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput1}
            placeholder="Child Name"
            placeholderTextColor="#929292"
            onChangeText={(CN) => setCN(CN)}
            value={CN}
          />
        </View>

        <TouchableOpacity
          style={styles.inputView}
          onPress={() => setDatePickerVisible(true)}>
          <Text style={[styles.dobText, dateFlag ? styles.bg1 : styles.bg2]}>
            {dateFlag ? CA : 'Date of birth'}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputaddress}>
          <TextInput
            style={styles.TextInput1}
            placeholder="School"
            placeholderTextColor="#929292"
            onChangeText={(SA) => setSA(SA)}
            value={SA}
          />
        </View>
        <View style={styles.inputaddress}>
          <TextInput
            style={styles.TextInput1}
            placeholder="Residence Address"
            placeholderTextColor="#929292"
            onChangeText={(HA) => setHA(HA)}
            value={HA}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 30,
        }}>
        <TouchableOpacity
          style={styles.pickerBtn}
          onPress={() => {
            setVisible(true), setTimerValue(1);
          }}>
          <Text style={[styles.dobText, textflag ? styles.bg1 : styles.bg2]}>
            {textflag ? ST : 'School Start Time'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pickerBtn}
          onPress={() => {
            setVisible(true), setTimerValue(2);
          }}>
          <Text style={[styles.dobText, textflag2 ? styles.bg1 : styles.bg2]}>
            {textflag2 ? ET : 'School End Time'}
          </Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={pickerValue}
        style={styles.Picker1}
        onValueChange={(value) => setPickerValue(value)}>
        <Picker.Item label="Select a blood group" value={0} />
        <Picker.Item label="A +ve" value="A+" />
        <Picker.Item label="A -ve" value="A-" />
        <Picker.Item label="B +ve" value="B+" />
        <Picker.Item label="B -ve" value="B-" />
        <Picker.Item label="AB +ve" value="AB+" />
        <Picker.Item label="AB -ve" value="AB-" />
        <Picker.Item label="O +ve" value="O+" />
        <Picker.Item label="O -ve" value="O-" />
      </Picker>

      <Text style={{...styles.error, marginBottom: 2}}>{value_error}</Text>
      <TouchableOpacity
        style={{...styles.loginBtn, marginTop: 2}}
        onPress={handlePress}>
        <Text style={styles.loginText}>Add Child</Text>
      </TouchableOpacity>
      <Text style={styles.serviceText}>
        * Nanny service is only provided for children of age below 9 years.
      </Text>
    </ScrollView>
  );
}
