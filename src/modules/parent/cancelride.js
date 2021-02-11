import React, { Component } from 'react';
import {
  StyleSheet,
  Text,StatusBar,TouchableOpacity,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2021,10,1);
    // const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    // const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    const startDate = moment(selectedStartDate).format('DD-MM-YYYY'); 
    const endDate = moment(selectedEndDate).format('DD-MM-YYYY'); 

    return (
      <View style={styles.container}>
        <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
          <View style={{marginLeft:20,alignSelf:'flex-start',justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:20}} >Cancelation of Ride:</Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>Select the Days of Cancelation</Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>(Hint: Double-Tap to select One Day)</Text>
        </View> 
        <View style={{backgroundColor:"#b3fff3",width:250,alignSelf:'center',margin:10}}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          // weekdays=['M','T','W','Th','F','Sa','Su']
          width={250}
          height={250}
          maxRangeDuration={10}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text style={styles.registerTextStyle}>Selected Start Date:{ startDate }</Text>
          <Text style={styles.registerTextStyle}>Selected End Date:{ endDate }</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignItems:'center', justifyContent:'center'},styles.loginBtn} >
          <Text style={styles.loginText}>APPLY</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    justifyContent:'center'

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
    marginLeft: 30,
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

});