import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import styles from '../../components/style';

const App = ({route, navigation}) => {
  const [selectedStartDate, setselectedStartDate] = useState('');
  const minDate = new Date();
  const maxDate = moment(selectedStartDate).format('DD-MM-YYYY');
  let tomorrow = selectedStartDate;
  const f = route.params.item.term;
  const [stay, setStay] = useState(true);
  const [{valueError}, setValueerror] = useState('');

  let e;
  if (f == 'Monthly') {
    e = 30;
  } else if (f == 'Quarterly') {
    e = 91;
  } else if (f == 'Half Yearly') {
    e = 182;
  } else if (f == 'Yearly') {
    e = 365;
  }
  const payhandler = (selectedStartDate) => {
    setselectedStartDate(selectedStartDate);
    setStay(false);
  };
  const validateentries = () => {
    if (stay == false) {
      setValueerror({valueError: null});
      navigation.navigate('PaymentScreen', {
        maxDate: maxDate,
        tomorrow: tomorrow,
        f: f,
        costly: route.params.item.total,
        childid: route.params.childid,
      });
    } else {
      setValueerror({valueError: 'Select Start Date of Plan'});
    }
  };
  tomorrow = moment(tomorrow).add(e, 'day').format('DD-MM-YYYY');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headertext1}>Start Date</Text>
        <View
          style={{
            backgroundColor: '#FBF0B2',
            width: 250,
            alignSelf: 'center',
            margin: 10,
          }}>
          <CalendarPicker
            startFromMonday={true}
            width={250}
            height={250}
            minDate={minDate}
            todayBackgroundColor="lightgrey"
            selectedDayColor="#FF5C00"
            selectedDayTextColor="#FFFFFF"
            onDateChange={(selectedStartDate) => payhandler(selectedStartDate)}
          />
        </View>
        <View>
          <Text style={styles.inputView1}>{maxDate}</Text>
        </View>
        <View>
          <Text style={styles.headertext1}>End Date</Text>
          <Text style={{...styles.inputView1,marginTop:3}}>{tomorrow}</Text>
        </View>
        <View>
          <Text style={styles.headertext1}>Cost</Text>
          <Text style={{...styles.inputView1,marginTop:3}}>{route.params.item.total}</Text>
        </View>
        <View>
          <Text style={styles.headertext1}>School Name</Text>
          <Text style={{...styles.inputView1,marginTop:3}}>{route.params.schooladdress}</Text>
        </View>
        <Text style={styles.error}>{valueError}</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => validateentries()}>
          <Text style={styles.loginText}>Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default App;
