import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity,Linking, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function trip_Details({ route, navigation }) {
  console.log("this.props",route.params.item);
    return (
      <View style={styles.container} >
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor= '#E91E63'
        //Background color of statusBar only works for Android
        //translucent={false}
      //allowing light, but not detailed shapes
      />
          <View style={styles.textview}>
              <Text style={styles.headertext}>Location:         </Text>
              <Text style={styles.details}>{route.params.item.location}</Text>
              <Text style={styles.headertext}>Timing:            </Text>
              <Text style={styles.details}>{route.params.item.driverInfo.driverContact}</Text>
              <Text style={styles.headertext}>Driver ID:         </Text>
              <Text style={styles.details}>{route.params.item.driverInfo.driverId}</Text>
              <Text style={styles.headertext}>Driver Name:  </Text>
              <Text style={styles.details}>{route.params.item.driverInfo.driverName}</Text>
              <Text style={styles.headertext}>Driver No:        </Text>
              <Text style={styles.details}>{route.params.item.driverInfo.driverContact}</Text>
              <Text style={styles.headertext}>Vehicle No:       </Text>
              <Text style={styles.details}>{route.params.item.vehicle}</Text>
            </View>
          {/* </View> */}
          <TouchableOpacity style={styles.loginBtn} onPress={ ()=>navigation.navigate('Child List',route.params.item)} >
        <Text style={styles.loginText}>Child List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
        <Text style={styles.loginText}>Contact Driver</Text>
      </TouchableOpacity>
      </View>
    );
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
  showcase:{
    padding:10,
    marginLeft:20,
    flexDirection:'row',
  },
  sidehead:{
    fontWeight:'bold',
    marginLeft:8,
    alignSelf:'flex-start',
    //position:'relative',
    justifyContent:'space-around'
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#B0003A',
    borderRadius: 10,
    padding:10,
    width: "80%",
    height: 45,
    alignItems: "center",
    alignSelf:'center',
    backgroundColor:"#fff",   //"#C4C4C4",
    margin: 8,
    //opacity: 0.5,
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
    margin: 20,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 30,
  },
  details:{
    height: 40,
    backgroundColor: "#D3D3D3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#FF5C8D',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  details2: {
    height: 320,
    backgroundColor: "white",
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
  loginText:{
    color:'black',
    fontSize:15,
   // fontWeight:'700'
  },
  CallBtn: {
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 'auto',
    backgroundColor: "#32CD32",
    alignSelf: 'center',
    marginBottom: 30,
  },
});





