import * as React from 'react';
import { Text,TouchableOpacity, View,StatusBar ,StyleSheet} from 'react-native';

const Employee = ({navigation}) =>  {
    return (
      <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor= '#e91e63'     
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
    
          <TouchableOpacity style={styles.loginBtn} onPress = {()=> navigation.navigate('driverList')} >
            <Text style={styles.loginText}>Driver</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress = {()=> navigation.navigate('Add_Driver')} >
            <Text style={styles.loginText}>Add Driver</Text>

          </TouchableOpacity>
        
          <TouchableOpacity style={styles.loginBtn}  onPress = {()=> navigation.navigate('nannyList')} >
            <Text style={styles.loginText}>Nanny</Text>

          </TouchableOpacity>
          
         
        
          <TouchableOpacity style={styles.loginBtn} onPress = {()=> navigation.navigate('Add_Nanny')} >
            <Text style={styles.loginText}>Add Nanny</Text>

          </TouchableOpacity>
      </View>  
    );
  }

export default Employee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,

  },

  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',

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
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },

});