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
import axios from 'axios';
import Ngrok from '../../constants/ngrok';

const PausePlan = ({route, navigation}) => {
  const [selectedStartDate, setselectedStartDate] = useState('');
  const [selectedEndDate, setselectedEndDate] = useState('');
  const minDate = new Date(); // Today
  const maxDate = new Date(2021, 10, 1);
  const startDate = moment(selectedStartDate).format('DD-MM-YYYY');
  const endDate = moment(selectedEndDate).format('DD-MM-YYYY');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState();

  const childid = route.params.childid;

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setselectedStartDate(date);
      setselectedEndDate();
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      let id = await childid;
      console.log('child id:', id);
      let response = await axios(`${Ngrok.url}/api/cancellation/details/${id}`);

      console.log('response: ', response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchdata();
  }, [count]);

  const pauseHandler = async () => {
    console.log('id', childid);
    console.log('sd: ', startDate);
    console.log('ed: ', endDate);

    if (startDate == 'Invalid date' || endDate == 'Invalid date') {
      setError('Please select start/end date');
    } else {
      try {
        axios
          .post(`${Ngrok.url}/api/subscription/pause`, {
            childid: childid,
            startdate: startDate,
            enddate: endDate,
          })
          .then(function (response) {
            // console.log('data: ', response.data);
            console.log('message: ', response.data.message);

            if (response.status == 200) {
              Alert.alert('Plan paused successful');
              setCount(count + 1);
            } else {
              Alert.alert('Failed. Please try again');
            }
          })
          .catch(function (error) {
            console.log('err', error.response.data);
            
            if (error.response.data.status == 409) {
              Alert.alert(JSON.stringify(error.response.data.message));
            } else if (error.response.data.status == 401) {
              Alert.alert('Failed. You have exhausted maximum attempts');
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isLoading ? (
    <ScrollView style={{backgroundColor: '#F9F2F2'}}>
      <View style={{flex: 1, marginTop: 200, }}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <View style={[data.pauseEndDate ? styles.biggerBox : styles.pausePlan]}>
        <Text style={styles.mainHeading}>Pause Plan Details</Text>
        <Text style={styles.heading}>Total Number of pauses - 03</Text>

        {!data.pauseEndDate ? null : (
          <>
            <Text style={styles.heading}>
              Pause start date - {data.pauseStartDate}
            </Text>
            <Text style={styles.heading}>
              Pause end date - {data.pauseEndDate}
            </Text>
          </>
        )}
        <Text style={styles.heading}>
          Pauses left - 0{data.remainingPauseAttempts}{' '}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 20,
          alignSelf: 'flex-start',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Pause Plan :-</Text>
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>
          Select the Days of Pause Plan
        </Text>
      </View>
      <View style={styles.headertext}>
        <Text style={styles.registerTextStyle}>
          (Hint: Double-Tap to select One Day)
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFE4E1',
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
          todayBackgroundColor="#F2E"
          selectedDayColor="#FF5C8D"
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
        onPress={pauseHandler}>
        <Text style={styles.loginText}>APPLY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
// }
export default PausePlan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',
    //justifyContent: 'center',
  },
  pausePlan: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    height: 110,
    width: '85%',
    alignSelf: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  biggerBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    height: 160,
    width: '85%',
    alignSelf: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
  },
  heading: {
    fontSize: 18,
    marginTop: 4,
    marginLeft: 10,
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
    backgroundColor: '#D3D3D3',
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
    marginTop: 5,
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
