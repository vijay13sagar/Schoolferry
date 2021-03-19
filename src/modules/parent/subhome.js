import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

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
      try {
        axios
          .post(`${Ngrok.url}/api/ride/cancel`, {
            childid: child_id,
            startdate: startDate,
            enddate: endDate,
          })
          .then(function (response) {
            console.log('status: ', response.status);

            if (response.status == 200) {
              Alert.alert('Ride cancelled successfully');
              setCount(count + 1);
              setLoading(true);
              setError();
              setselectedEndDate('');
              setselectedStartDate('');
            } else {
              Alert.alert('Failed. Please try again');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  return isLoading ? null : (
    <ScrollView>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#e91e63"
        translucent={false}
      />

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
        {Boolean(value1.length) &&
          value1[0].trips.map((item) => (
            <TouchableOpacity
              style={styles.trips}
              onPress={() => navigation.navigate('Trip_details', item)}>
              <Text
                style={{
                  justifyContent: 'center',
                  marginTop: 6,
                  marginLeft: 10,
                }}>
                {item.tripId}
              </Text>
            </TouchableOpacity>
          ))}
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
          backgroundColor: '#ffe4e1',
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
          todayBackgroundColor="#ff5c8d"
          selectedDayColor="#ff5c8d"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
        <View>
          <Text style={styles.registerTextStyle}>
            Selected Start Date: {startDate}
          </Text>
          <Text style={styles.registerTextStyle}>
            Selected End Date: {endDate}
          </Text>
        </View>
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
  );
};
// }
export default subscribedHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
    justifyContent: 'center',
  },
  error: {
    padding: 1,
    color: '#DC143C',
    fontSize: 14,
    textAlign: 'center',
  },

  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  body: {
    marginTop: 180,
    alignItems: 'center',
  },
  textview: {
    marginBottom: 7,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 30,
  },
  details: {
    height: 40,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    width: '85%',
    padding: 8,
    alignSelf: 'center',
  },
  trips: {
    height: 40,
    backgroundColor: 'white',

    width: '95%',
    marginTop: 5,
    alignSelf: 'center',
  },
  loginBtn: {
    width: '50%',
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5C8D',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  Picker: {
    width: '45%',
    marginVertical: 10,
    borderRadius: 10,
    height: 30,
    borderWidth: 1,
    alignContent: 'center',
    alignSelf: 'flex-end',
  },
  inputViews: {
    borderWidth: 1,
    borderColor: '#B0003A',
    borderRadius: 10,
    width: '80%',
    height: 100,
    alignItems: 'center',
    backgroundColor: '#fff', //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
});
