import * as React from 'react';
import { Text, StyleSheet,View ,Linking, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Support = () =>  {
    return (
      <View style={styles.container}>
      
        <View >
          {/* <View style={{marginTop:40,flexDirection:'row'}}>
          <Ionicons name="person-circle"
                        color="black" size={40}
          />
          <Text style={{fontSize:30,fontWeight:'bold',}}>
            Support
          </Text>
          </View> */}
          <Text style={{fontSize:19, textAlign:'center',marginHorizontal:10}}>If you have any complaint/query regarding
          our services, feel free to mail.</Text>
        </View>
       <TouchableOpacity style={styles.loginBtn} onPress={() => Linking.openURL('mailto:AdminSchoolferry@example.com?subject=SendMail&body=Hi Admin,') }
      title="AdminSchoolferry@example.com" >
        <Text style={{fontSize:17,color:'#000'}}> Write a Mail</Text>
      </TouchableOpacity>
      <View style={{marginTop:70}}>
      <Text style={{fontSize:19,alignSelf:'center',}}>Or you can call us </Text>
      <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8192856814') }}  >
        <Text style={{fontSize:17, color:'#000'}}>Make a Call </Text>
      </TouchableOpacity>
      </View>
  
      </View>
    );
  }

export default Support;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2F2',  
    justifyContent: "center",
  },

loginBtn: {
  width: "80%",
  borderRadius: 10,
  height: 41,
  alignSelf:'center',
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  backgroundColor: "#ff5c8d",

},
CallBtn: {
  width: "80%",
  borderRadius: 10,
  height: 41,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#32cd32",
  alignSelf: 'center',
  marginTop: 20,
  marginBottom: 50,
},
});