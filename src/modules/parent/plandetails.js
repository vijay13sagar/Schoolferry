import React, { Component } from 'react';
import {
  StyleSheet,
  Text,StatusBar,
  View,
  TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Item } from 'native-base';

export default class App extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
  
    const { selectedStartDate } = this.state;
    const minDate=new Date();//Today
    const maxDate = moment(selectedStartDate).format('DD-MM-YYYY'); 
    let tomorrow = selectedStartDate;
    tomorrow = moment(tomorrow).add(30, 'day').format('DD-MM-YYYY');
    //const e=30;//for plans in place of 30 keep e as below and save number of days in e
    //tomorrow = moment(tomorrow).add(e, 'day').format('DD-MM-YYYY');
    return (
      <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
        <Text style={styles.headertext} >Start Date</Text>
        <View style={{backgroundColor:"#b3fff3",width:250,alignSelf:'center',margin:10}}>
        <CalendarPicker
          startFromMonday={true}
          width={250}
          height={250}
          minDate={minDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
        </View>
        {/* <View>
          <Text style={styles.details}>{ startDate }</Text>
        </View> */}
        <View>
          <Text style={styles.inputView}>{ maxDate }</Text>
        </View>
        <View style={styles.textview}>
        <Text style={styles.headertext} >End Date</Text>
        <Text style={styles.inputView}>{tomorrow}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Cost</Text>
        <Text style={styles.inputView}>XXXXXXX</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >School Name</Text>
        <Text style={styles.inputView}>XXXXX</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>this.props.navigation.navigate('PaymentScreen')}>
              <Text style={styles.loginText}>Pay</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

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
    marginTop: 20,
  },
  inputView: {
    padding:9,
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignSelf
    : "center",
    
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },

});