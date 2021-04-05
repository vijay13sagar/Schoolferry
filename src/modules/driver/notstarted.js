import * as React from 'react';
import { Text, View,StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../../components/style';

const oldmap = ({navigation}) =>  {
    return (
      <View style={styles.container} >
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
          <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
            
            <Text style={styles.centerview} >To Check location on map, Please Start a Trip</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Home',{refresh:true})}>
              <Text style={styles.loginText}>Start Trip</Text>
            </TouchableOpacity>
            
          </View>
      </View>
    );
  }

export default oldmap;
