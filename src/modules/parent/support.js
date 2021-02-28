import * as React from 'react';
import { Text, StyleSheet,View ,Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Support = () =>  {
    return (
      <View style={{ flex: 1,marginLeft:20,padding:10,justifyContent:'space-between'}}>
        <View >
          {/* <View style={{marginTop:40,flexDirection:'row'}}>
          <Ionicons name="person-circle"
                        color="black" size={40}
          />
          <Text style={{fontSize:30,fontWeight:'bold',}}>
            Support
          </Text>
          </View> */}
          <Text style={{marginTop:20,fontSize:20,alignSelf:'center'}}>If you have any complains regarding
our services,feel free to mail us.</Text>
        </View>
       <TouchableOpacity style={styles.loginBtn} onPress={() => Linking.openURL('mailto:AdminSchoolferry@example.com?subject=SendMail&body=Hi Admin,') }
      title="AdminSchoolferry@example.com" >
        <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Complain</Text>
      </TouchableOpacity>
      <View style={{marginTop:180}}>
      <Text style={{marginVertical:20,fontSize:20,alignSelf:'center',}}>For More details, Call Admin</Text>
      <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
        <Text style={styles.loginText}>Call Admin</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }

export default Support;
const styles = StyleSheet.create({
loginBtn: {
  width: "60%",
  borderRadius: 10,
  height: 41,
  alignSelf:'center',
  alignItems: "center",
  justifyContent: "center",
  marginTop: 31,
  backgroundColor: "#ff5c8d",

},
CallBtn: {
  width: "80%",
  borderRadius: 10,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#32cd32",
  alignSelf: 'center',
  marginBottom: 50,
},
});