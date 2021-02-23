import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';

const oldmap = ({navigation}) =>  {
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
      
          <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            
            <Text style={styles.centerview} >To Check location on map, Please Start a Trip</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Home',{refresh:true})}>
              <Text>Start Trip</Text>
            </TouchableOpacity>
            
          </View>
      </View>
    );
  }

export default oldmap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },

  centerview: {
    justifyContent:'center',
    //alignContent:'center',
    //marginTop: 180,
    //alignItems: 'center',
    alignSelf:'center'

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
