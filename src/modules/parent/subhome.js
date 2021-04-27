import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
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
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [loader, setLoader] = useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();
  const [type, setType] = useState();

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
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      };

      fetchUser();
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
          var data = item.name
            .toLowerCase()
            .includes(selectedValue.toLowerCase());
          return data;
        })
      : [];

  const cancelHandler = async () => {
    let child_id = await value1[0].id;
    if (startDate == 'Invalid date' || endDate == 'Invalid date') {
      setError('Please select start/end date');
    } else {
      setLoader(true);
      try {
        axios
          .post(`${Ngrok.url}/api/ride/cancel`, {
            childid: child_id,
            startdate: startDate,
            enddate: endDate,
          })
          .then(function (response) {
            setLoader(false);

            if (response.status == 200) {
              setToast(true);
              setType(ToastMessage.success);
              SetMessage(ToastMessage.message4);
              setCount(count + 1);
              setError();
              setselectedEndDate('');
              setselectedStartDate('');
            } else {
              setToast(true);
              setType(ToastMessage.failure);
              SetMessage(ToastMessage.message5);
            }
          })
          .catch(function (error) {
            setLoader(false);
            console.log(error);
          });
      } catch (error) {
        console.log('error: ', error);
      }
    }
    setToast(false);
  };

  return isLoading ? (
    <Loader loading={isLoading} />
  ) : (
    <View style={styles.cont}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#FF5C00"
          translucent={false}
        />
        {showtoast ? <ToastComponent type={type} message={message} /> : null}
        <Loader loading={loader} />

        <Picker
          selectedValue={selectedValue}
          style={styles.Picker}
          onValueChange={(value) => setValue(value)}>
          {myUsers()}
        </Picker>

        <TouchableOpacity
          style={{...styles.profileView, marginTop: 0, marginBottom: 8}}>
          {Boolean(value1[0].photoUrl) ?(
            <Image
              style={{height: '100%', width: '100%', borderRadius: 50}}
              source={{uri: value1[0].photoUrl}}
            />
          ) : (
            <Image
              style={{height: '100%', width: '100%', borderRadius: 50}}
              source={{
                uri:
                  'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png',
              }}
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 20,
            alignSelf: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Trips For Today :-
          </Text>
        </View>
        <View>
          {Boolean(value1[0].trips.length) ? (
            value1[0].trips.map((item) => (
              <TouchableOpacity
                key={item.tripId}
                style={styles.trips}
                onPress={() => navigation.navigate('Trip_details', item)}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    alignSelf: 'center',
                  }}>
                  {item.tripId}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  color="#000"
                  size={19}
                  style={{alignSelf: 'center', marginRight: 10}}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{justifyContent: 'center', marginLeft: 30}}>
              No Trips
            </Text>
          )}
        </View>
        <View
          style={{
            marginLeft: 20,
            alignSelf: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Plan Details :-
          </Text>
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
          <Text style={styles.registerTextStyle}>
            End date of Subscription:
          </Text>
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
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
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
            width={250}
            height={250}
            maxRangeDuration={10}
            todayBackgroundColor="lightgrey"
            selectedDayColor="#FF5C00"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 10}}>
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
          <Text style={styles.loginText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default subscribedHome;
