import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,StatusBar,TouchableOpacity,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

  const App =({route,navigation}) =>  { 
    const onDateChange = (date, type) =>{
      if (type === 'END_DATE') {
        setselectedEndDate(date);
      } else {
        setselectedStartDate(date);
        setselectedEndDate();
      }
    }
    const [selectedStartDate, setselectedStartDate] = useState("")
     const {pickerValue, setPickerValue} = useState("");
     const [selectedEndDate, setselectedEndDate] = useState("")
    const minDate = new Date(); // Today
    const maxDate = new Date(2021,10,1);
    const startDate = moment(selectedStartDate).format('DD-MM-YYYY');
    const endDate = moment(selectedEndDate).format('DD-MM-YYYY');
    return (
      <View style={styles.container}>
        <ScrollView>
        <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#E91E63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes
      />
       <Picker
      selectedValue={pickerValue}
          style={styles.Picker}
          onValueChange={(pickerValue) =>
            setPickerValue(pickerValue)
          }>
          <Picker.Item label="Child 1" value="Child1" />
          <Picker.Item label="Child 2" value="Child 2" />
        </Picker>
        <View style={{marginLeft:20,alignSelf:'flex-start',justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:20}} >Plan Details:</Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>Plan Tenure</Text>
        </View>
        <View style={styles.details}>
          <Text >
          </Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>Date of Subscription:</Text>
        </View>
        <View style={styles.details}>
          <Text >
          </Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>End date of Subscription:</Text>
        </View>
        <View style={styles.details}>
          <Text >
          </Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>Pick up location:</Text>
        </View>
        <View style={styles.details}>
          <Text >
          </Text>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={{alignSelf:"center",marginLeft:7}}>Extend plan</Text>
        </TouchableOpacity>
          <View style={{marginLeft:20,alignSelf:'flex-start',justifyContent:'center'}}>
          <Text style={{fontWeight:'bold',fontSize:20}} >Cancelation of Ride:</Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>Select the Days of Cancelation</Text>
        </View>
        <View style={styles.headertext}>
          <Text style={styles.registerTextStyle}>(Hint: Double-Tap to select One Day)</Text>
        </View>
        <View style={{backgroundColor:'#ffe4e1',width:250,alignSelf:'center',margin:10}}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          // weekdays=['M','T','W','Th','F','Sa','Su']
          width={250}
          height={250}
          maxRangeDuration={10}
          todayBackgroundColor="#F2E6FF"
          selectedDayColor="#ff5c8d"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
        <View>
          <Text style={styles.registerTextStyle}>Selected Start Date:{ startDate }</Text>
          <Text style={styles.registerTextStyle}>Selected End Date:{ endDate }</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignItems:'center', justifyContent:'center'},styles.loginBtn} >
          <Text style={styles.loginText}>APPLY</Text>
      </TouchableOpacity>
      </ScrollView>
      </View>
    );
  }
// }
export default App;
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
    backgroundColor: "#FF5C8D",
    alignSelf: "center",
    marginTop: 20,
  },
  Picker: {
    width:"45%",
    marginVertical:10,
    borderRadius:10,
    height:30,
    borderWidth:1,
    alignContent:"center",
    alignSelf:"flex-end",
 },
  inputViews: {
    borderWidth: 1,
    borderColor: '#B0003A',
    borderRadius: 10,
    width: "80%",
    height: 100,
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
});