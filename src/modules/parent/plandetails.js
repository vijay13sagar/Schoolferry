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
import styles from '../../components/style';


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
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#FF5C00"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
      <ScrollView>
        <Text style={styles.headertext1} >Start Date</Text>
        <View style={{ backgroundColor: '#FBF0B2', width: 250, alignSelf: 'center', margin: 10 }}>
          <CalendarPicker
            startFromMonday={true}
            width={250}
            height={250}
            minDate={minDate}
            todayBackgroundColor="lightgrey"
            selectedDayColor="#FF5C00"
            selectedDayTextColor="#FFFFFF"
            // onDateChange={this.onDateChange}
            onDateChange={(selectedStartDate) => payhandler(selectedStartDate)}
          />
        </View>
        <View>
          <Text style={styles.inputView1}>{maxDate}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext1} >End Date</Text>
          <Text style={styles.inputView1}>{tomorrow}</Text>
        </View>
        <View style={styles.textview}> 
          <Text style={styles.headertext1} >Cost</Text>
          <Text style={styles.inputView1}>{route.params.item.total}</Text>
         </View>
        <View style={styles.textview}>
          <Text style={styles.headertext1} >School Name</Text>
          <Text style={styles.inputView1}>{route.params.schooladdress}</Text>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9F2F2",

//   },
//   textview: {
//     marginBottom: 7,
//   },
//   headertext: {
//     fontSize: 13,
//     marginLeft: 50,
//   },

//   inputView: {
//     padding: 9,
//     borderWidth: 1,
//     borderColor: '#b0003a',
//     borderRadius: 10,
//     width: "80%",
//     //height: 45,
//     alignSelf: "center",
//     backgroundColor: "#fff",   //"#C4C4C4",
//     marginTop: 5,
//     //opacity: 0.5,
//   }, 

// });