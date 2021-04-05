import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import Loader from '../../components/Loader';
import styles from '../../components/style';

export default function addchild({ route, navigation }) {
  const [CN, setCN] = useState("");
  const [CA, setCA] = useState("");
  const [ST, setST] = useState("");
  const [ET, setET] = useState("");
  const [SA, setSA] = useState(route.params.schooladdress);
  const [HA, setHA] = useState(route.params.homeaddress);
  const [{ value_error }, setError] = useState("");
  const [pickerValue, setPickerValue]= useState()
  const [visible, setVisible] = useState(false)
  const [timerValue, setTimerValue] = useState(0)
  const [textflag, setTextFlag] = useState(false)
  const [textflag2, setTextFlag2] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [dateFlag, setDateFlag] = useState(false)
  const [isLoading, setLoading] = useState(false);


  const distanceCal = route.params.distance;
  console.log('distance',route.params.distance)

  const validateFunction = () => {
    if (!CN || !CA || !ST || !ET || !SA || !HA) {
      setError({ value_error: "Fields Cannot be Empty" })
      return false
    } else {
      return true
    }
  }

  // useEffect(() => {
  //   const fetchData = navigation.addListener('focus', async () => {
  //     let token = await AsyncStorage.getItem('token');
  //     console.log('token:', token)
  //   })

  //   fetchData;  
  // }, [])

  const handlePress = async () => {

    let token = await AsyncStorage.getItem('token');
    if (validateFunction()) {
      setLoading(true)
      try {
        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/child`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            name: CN,
            dob: CA,
            bloodgroup: pickerValue,
            address: HA,
            school: SA,
            starttime: ST,
            endtime: ET,
            distance: Number(distanceCal),
            parentid: token,

          }
        })
          .then(function (response) {
            console.log('status',response.status);
            setLoading(false)

            if (response.status == 200) {
             // console.log(response.data)
             setCN("")
             setCA("")
             setPickerValue("")
             setError("")
             setST("")
             setET("")
             setTextFlag(false)
             setTextFlag2(false)
             setDateFlag(false)
              navigation.navigate('Subscription_list', {
                childID: response.data,
                school: SA
              })
            }
            else {
              alert('failed ')
            }

          })
          .catch(function (error) {
            setLoading(false)
            console.log(error);
          })
      }
      catch (error) {
        console.log("errordetails", error);
      }
  
    }
  }

  const handleConfirm = (date) => {
    console.log("time: ", moment(date).format('HH:mm'));

    if(timerValue == "1"){
      setST(moment(date).format('HH:mm'))
     setTimerValue(0)
     setTextFlag(true)
    }
    else if (timerValue == "2"){
      setET(moment(date).format('HH:mm'))
     setTimerValue(0)
     setTextFlag2(true)
    }

    setVisible(false)
  };

 const handleDatePicked = date => {
    console.log("A date has been picked: ", moment(date).format('DD-MM-yyyy'));
    setCA(moment(date).format('DD-MM-yyyy'))
    setDateFlag(true)
    setDatePickerVisible(false)
  };

  return (
    <View style={styles.container}>
        <Loader loading={isLoading} />
      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={()=> setVisible(false)}
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
  
     <View style={{marginTop:60}}>
      <View style={styles.inputView }>
        <TextInput
          style={styles.TextInput1}
          placeholder="Child Name"
          placeholderTextColor="#929292"
          onChangeText={(CN) => setCN(CN)}
          value= {CN}
        />
      </View>

      <TouchableOpacity style={styles.inputView}
        onPress={()=> setDatePickerVisible(true) }>
        <Text style={[styles.dobText, dateFlag? styles.bg1 : styles.bg2 ]}>
        {dateFlag? CA :"Date of birth"}</Text>
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

      <View style={{flexDirection:'row', justifyContent:'space-evenly',marginHorizontal:30}}>
      <TouchableOpacity style={styles.pickerBtn}
        onPress={()=>{
          setVisible(true), setTimerValue(1) } }>
        <Text style={[styles.dobText, textflag ? styles.bg1 : styles.bg2]}>{textflag? ST :"School Start Time"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pickerBtn}
        onPress={()=>{
          setVisible(true), setTimerValue(2) }}  >
        <Text style={[styles.dobText, textflag2 ? styles.bg1 : styles.bg2]}>{textflag2? ET :"School End Time"}</Text>
      </TouchableOpacity>
      </View>
      <Picker
        selectedValue={pickerValue}
        style={styles.Picker1}
        onValueChange={(value) => setPickerValue(value)} 
        
        >
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
          
      <Text style={styles.error}>{value_error}</Text>
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }, styles.loginBtn}
        onPress={handlePress} >
        <Text style={styles.loginText}>Add Child</Text>
      </TouchableOpacity>
          <Text style= {styles.serviceText}>
            * Nanny service is only provided for children of age below 9 years.
          </Text>

    </View>
  );
}
