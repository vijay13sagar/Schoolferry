import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import styles from '../../components/style';

const subscribedHome = ({route, navigation}) => {
  const [selectedStartDate, setselectedStartDate] = useState('');
  const [selectedEndDate, setselectedEndDate] = useState('');
  const minDate = new Date(); // Today
  const maxDate = new Date(2021, 10, 1);
  const startDate = moment(selectedStartDate).format('DD-MM-YYYY');
  const endDate = moment(selectedEndDate).format('DD-MM-YYYY');
  const [pickerValue, setPickerValue] = useState([]);
  const [selectedValue, setValue] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [loader,setLoader] = useState(false)

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setselectedStartDate(date);
      setselectedEndDate();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          let token = await AsyncStorage.getItem('token');

          const response = await axios(
            `${Ngrok.url}/api/parent/childlist/${token}`,
          );

          setPickerValue(response.data.childList);
          setValue(response.data.childList[0].name);

          // console.log('data',response.data.childList[0].name, selectedValue)
          //console.log('refresh subhome:', response.data.childList[0]);
          setLoading(false);
        } catch (e) {
          // Handle error
        }
      };

      fetchUser();

      //return null;
    }, [count]),
  );

  const myUsers = () => {
    return (
      pickerValue &&
      pickerValue.map((myValue) => {
        return (
          <Picker.Item
            label={myValue.name}
            value={myValue.name}
            key={myValue.id}
          />
        );
      })
    );
  };

  const value1 =
    pickerValue.length && selectedValue
      ? pickerValue.filter((item) => {
          //console.log('check value', pickerValue, selectedValue)
          // return item.name.toLowerCase().includes(selectedValue.toLowerCase());
          var data = item.name
            .toLowerCase()
            .includes(selectedValue.toLowerCase());

          // return item.name.toLowerCase().includes(selectedValue.toLowerCase())
          return data;
        })
      : [];

  //console.log('value1', value1[0]);
 
  const cancelHandler = async () => {
    let child_id = await value1[0].id;
    console.log('id:', child_id);

    if (startDate == 'Invalid date' || endDate == 'Invalid date') {
      setError('Please select start/end date');
    } else {
      setLoader(true)
      try {
        axios
          .post(`${Ngrok.url}/api/ride/cancel`, {
            childid: child_id,
            startdate: startDate,
            enddate: endDate,
          })
          .then(function (response) {
            console.log('status: ', response.status);
            setLoader(false)

            if (response.status == 200) {
              Alert.alert('Ride cancelled successfully');
              setCount(count + 1);
              //setLoading(true);
              setError();
              setselectedEndDate('');
              setselectedStartDate('');
            } else {
              
              Alert.alert('Failed. Please try again');
            }
          })
          .catch(function (error) {
            setLoader(false)
            console.log(error);
          });
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  return isLoading ? (
    <Loader loading= {isLoading} />
  ) : (
    <View style={styles.cont}>
    <ScrollView>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
     <Loader loading = {loader} />

      <Picker
        selectedValue={selectedValue}
        style={styles.Picker}
        onValueChange={(value) =>
          /*{ console.log('pickervalue',value);*/ setValue(value)
        }>
        {myUsers()}
      </Picker>
      <View
        style={{
          marginLeft: 20,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 21}}>
          Trips For Today :-
        </Text>
      </View>
      <View>
        {Boolean(value1[0].trips.length) ?
        value1[0].trips.map((item)=>(
        <TouchableOpacity key = {item.tripId} style={styles.trips} onPress={()=> navigation.navigate('Trip_details',item)}>
        <Text  style={{justifyContent:'center',marginTop:6,marginLeft:10}}>{item.tripId}</Text>
        </TouchableOpacity>
        ))
        :
        <Text style={{justifyContent:"center",marginLeft:30}}>No Trips</Text>
        }
      </View>
      <View
        style={{
          marginLeft: 20,
          alignSelf: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 21}}>Plan Details :-</Text>
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>Plan Tenure</Text>
      </View>
      <View style={styles.details}>
        {Boolean(value1.length) && <Text>{value1[0].tenure}</Text>}
      </View>

      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>Date of Subscription:</Text>
      </View>
      <View style={styles.details}>
        {Boolean(value1.length) && <Text>{value1[0].startDate}</Text>}
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>End date of Subscription:</Text>
      </View>
      <View style={styles.details}>
        {Boolean(value1.length) && <Text>{value1[0].endDate}</Text>}
      </View>

      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>Total Cost</Text>
      </View>
      <View style={styles.details}>
        {Boolean(value1.length) && <Text>{value1[0].cost}</Text>}
      </View>
  

      <View
        style={{
          marginLeft: 20,
          alignSelf: 'flex-start',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Cancelation of Ride :-
        </Text>
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>
          Select the Days of Cancelation
        </Text>
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>
          (Hint: Double-Tap to select One Day)
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#FBF0B2',
          width: 250,
          alignSelf: 'center',
          margin: 10,
        }}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          // weekdays=['M','T','W','Th','F','Sa','Su']
          width={250}
          height={250}
          maxRangeDuration={10}
          todayBackgroundColor="lightgrey"
          selectedDayColor="#FF5C00"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />    
      </View>
      <View style={{alignSelf:'center',marginTop:10}}>
          <Text style={styles.registerTextStyle}>
            Selected Start Date: {startDate}
          </Text>
          <Text style={styles.registerTextStyle}>
            Selected End Date: {endDate}
          </Text>
        </View>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity
        style={
          ({alignItems: 'center', justifyContent: 'center'}, styles.loginBtn)
        }
        onPress={cancelHandler}>
        <Text style={styles.loginText}>APPLY</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};
// }
export default subscribedHome;
