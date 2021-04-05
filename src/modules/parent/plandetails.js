import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text, StatusBar,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Item } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const App = ({ route, navigation }) => {
  const [selectedStartDate, setselectedStartDate] = useState("")
  const minDate = new Date();//Today
  const maxDate = moment(selectedStartDate).format('DD-MM-YYYY');
  let tomorrow = selectedStartDate;
  const f = route.params.item.term;
  const [stay, setStay] = useState(true);
  const [{ valueError }, setValueerror] = useState('');
  
  let e;
  if (f == 'Monthly') {
    e = 30;
  } else if (f == 'Quarterly') {
    e = 91;
  } else if (f == 'Half Yearly') {
    e = 182;
  } else if (f == "Yearly") {
    e = 365;
  }
  const payhandler = (selectedStartDate) => {
    setselectedStartDate(selectedStartDate);
    setStay(false);   
  }
  const validateentries = () => {
    if (stay == false) {
      setValueerror({ valueError: null });
      navigation.navigate('PaymentScreen', {
        maxDate: maxDate,
        tomorrow: tomorrow,
        f: f,
        costly: route.params.item.total,
        childid: route.params.childid
      })
    } else {
      setValueerror({ valueError: 'Select Start Date of Plan' });
    }
  }
  tomorrow = moment(tomorrow).add(e, 'day').format('DD-MM-YYYY');
  console.log("to",tomorrow);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headertext} >Start Date</Text>
        <View style={{ backgroundColor: '#ffe4e1', width: 250, alignSelf: 'center', margin: 10 }}>
          <CalendarPicker
            startFromMonday={true}
            width={250}
            height={250}
            minDate={minDate}
            todayBackgroundColor="lightgrey"
            selectedDayColor="#ff5c8d"
            selectedDayTextColor="#FFFFFF"
            // onDateChange={this.onDateChange}
            onDateChange={(selectedStartDate) => payhandler(selectedStartDate)}
          />
        </View>
        <View>
          <Text style={styles.inputView}>{maxDate}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >End Date</Text>
          <Text style={styles.inputView}>{tomorrow}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >Cost</Text>
          <Text style={styles.inputView}>{route.params.item.total}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >School Name</Text>
          <Text style={styles.inputView}>{route.params.schooladdress}</Text>
        </View>
        {/* disabled={stay} */}
        <Text style={styles.error}>{valueError}</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => validateentries()}>
          <Text style={styles.loginText}>Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "black",
    //marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  error: {
    color: '#DC143C',
    fontSize: 11,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  body: {
    marginTop: 180,
    alignItems: 'center'

  },
  textview: {
    marginBottom: 7,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 50,
  },
  details: {
    height: 40,
    backgroundColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginVertical: 15
  },
  inputView: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    //height: 45,
    alignSelf: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  }, 

});