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
import Loader from '../../components/Loader';
import styles from '../../components/style';

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
  const [loader, setLoader] = useState(false)

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
      setLoader(true)
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
            setLoader(false)

            if (response.status == 200) {
              Alert.alert('Plan paused successful');
              setCount(count + 1);
              setError()
              setselectedEndDate('')
              setselectedStartDate('')
            } else {
              Alert.alert('Failed. Please try again');
            }
          })
          .catch(function (error) {
            console.log('err', error.response.data);
            setLoader(false)
            
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
    <Loader loading= {isLoading} />
  ) : (
    <ScrollView style={styles.container}>
      <Loader loading = {loader} />

      <View style={[data.pauseEndDate ? styles.biggerBox : styles.pausePlan]}>
        <Text style={styles.mainHeading1}>Pause Plan Details</Text>
        <Text style={styles.heading}>Total number of pauses - 03</Text>

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
          Pauses remaining - 0{data.remainingPauseAttempts}{' '}
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
        onPress={pauseHandler}>
        <Text style={styles.loginText}>APPLY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
// }
export default PausePlan;
