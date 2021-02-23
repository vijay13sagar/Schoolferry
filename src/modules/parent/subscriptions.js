import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';

const subscription = ({navigation}) =>  {
    return (
      <View style={styles.container} >
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
      
          <View style={styles.body}>
            <View style={styles.slogans}>
              <Text style={{fontWeight:'bold',fontSize:18,alignSelf:'center'}}>We Provide</Text>
              <Text style={styles.sidehead}>Easy Tracking</Text>
              <Text style={styles.content}>With advanced tracking algorithms, you can now track live location of the cab taking your little one to school, also always stay updated about the current status.</Text>
              <Text style={styles.sidehead}>Highly Flexible</Text>
              <Text style={styles.content}>Schoolferry is not like regular school bus service provided by schools, we provide you flexible booking and cancellation options. You can cancel anytime even for one way.</Text>
              <Text style={styles.sidehead}>Low Cost</Text>
              <Text style={styles.content}>In the world of price hikes on everything, we are here with exceptionally low price packages, join today for jaw-dropping value for money packages.</Text>
              <Text style={styles.sidehead}>Highly Safe</Text>
              <Text style={styles.content}>With a team of highly experienced drivers and advanced location tracking app, schoolferry provide you safety like never before. Nannies are also here for taking care of your little ones.</Text>
            </View>
            <Text style={styles.body} >To see plans, add the child details</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Subscription_list',{refresh:true})}>
              <Text style={styles.loginText}>Add Child</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Cancel Rides')}>
              <Text style={styles.loginText}>Cancel ride</Text>
            </TouchableOpacity>
            
          </View>
      </View>
    );
  }

export default subscription;
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
  sidehead:{
    fontWeight:'bold',
    marginLeft:8,
    alignSelf:'flex-start',
    justifyContent:'space-around'
  },
  content:{
    marginLeft:13,
    alignSelf:'flex-start',
    justifyContent:'space-around'
  },
  slogans:{
    borderWidth: 1,
      borderColor: '#b0003a',
      borderRadius: 10,
      width: "80%",
      height: 400,
      padding:2,
      // alignItems: "center",
      // justifyContent:'center',
      // alignContent:'center',
      // alignSelf:'center',
      backgroundColor:'#ffe4e1',   //"#C4C4C4",
      marginVertical: 15,
      //opacity: 0.5,
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  body: {
    justifyContent:'center',
    alignContent:'center',
    //marginTop: 180,
    alignItems: 'center'

  },
  textview: {
    margin: 20,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 30,
  },
  details: {
    height: 40,
    margin:10,
    backgroundColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  details2: {
    height: 200,
    backgroundColor: "grey",
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
