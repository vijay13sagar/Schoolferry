import React,{useState} from 'react';
import { Text, View,StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { sub } from 'react-native-reanimated';



const oldmap = ({navigation}) =>  {
  let [flag,setflag]=useState(false);
  const Subs=() =>{
    return(
  <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            <View style={styles.body}>
               <Text style={styles.name}>No Trips</Text>
            </View>
              <Text style={styles.centerview} >You did not avail Any Service or Added Child</Text>
              <Text style={styles.centerview} >To Add Child ,Check Service Availability First</Text>
              <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Home',{refresh:true})}>
                <Text>Check</Text>
              </TouchableOpacity>
    </View>
    );
  }
  const Nosubs=() =>{
    return(
  <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
       <View style={styles.body}>
               <Text style={styles.name}>No Trips</Text>
            </View>
        <Text style={styles.centerview} >There are No Active Trips Today</Text>
          </View>
    );
  }
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
        {flag ? <Subs/> : <Nosubs/>}
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
    marginVertical:10,
    alignSelf:'center'

  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  body: {

    marginVertical:40,
    alignSelf:'center'

  },
  headertext: {
    fontSize: 13,
    marginTop:15,
    marginLeft: 35,
    alignItems:'center'
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
