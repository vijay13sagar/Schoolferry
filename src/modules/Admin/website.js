// import * as React from 'react';
// import { Searchbar } from 'react-native-paper';

// const MyComponent = () => {
//   const [searchQuery, setSearchQuery] = React.useState('');

//   const onChangeSearch = query => setSearchQuery(query);

//   return (
//     <Searchbar
//       placeholder="Search"
//       onChangeText={onChangeSearch}
//       value={searchQuery}
//     />
//   );
// };

// export default MyComponent;
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StatusBar,
} from "react-native";

import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function Add_Driver({navigation}) {
   
    const [title, settitle] = useState("");
    const [message, setmessage] = useState("");
    const [{ emptyFields }, setemptyFeilds] = useState("");
    const [role, setrole] = useState("")

    

    const validateFunction = () => {

        if (!title ||!role|| !message) {
            setemptyFeilds({ emptyFields: "Please Enter All The Details" })
            
            return false
        }

        else if (role=="0") {
            setemptyFeilds({ emptyFields: "Select valid Reciver" })
            
            return false
        }
     else {
          
          setemptyFeilds({ emptyFields: null })
          
          return true
     }

        

    }

    function pressHandler() {
       
        if (validateFunction()) {
            console.log("start");
            try {
                axios({
                    method: 'POST',
                    url: `${Ngrok.url}/api/admin/notifications`,
                    "headers": {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        receiver: role,
                       
                        title: title,
                       msg: message,
                        

                    }
                })
                    .then(function (response) {
                        if (response.status == 200) {
                            Alert.alert('Notification Sent')
                        }

                        console.log("response", response.status);
                    })
                    .catch(function (error) {
                        console.log(error.response.status) // 401
                        console.log(error.response.data.error) //Please Authenticate or whatever returned from server
                        if (error.response.status == 401) {

                            Alert.alert('Please try again!')
                        }

                    })

            }
            catch (error) {
                console.log("errordetails", error);
            }
        }
    }
    const onPressLogout = async () => {
        try {
          // const keys = await AsyncStorage.getAllKeys();
          // await AsyncStorage.multiRemove(keys);
          AsyncStorage.removeItem('token');
          console.log("working");
          navigation.replace('Login');
        Alert.alert('You have been logged out');
      } catch (error) {
          console.error('Error clearing app data.',error);
      }
        //AsyncStorage.removeItem('token');
        //window.localStorage.clear();
        //AsyncStorage.clear()
        
      }

    return (
        <View style={styles.container}>


<Picker
      selectedValue={role}
          style={styles.Picker}
          
          onValueChange={(role) =>
            setrole(role)
          }>
              <Picker.Item label="select Reciver" value="0" />
          <Picker.Item label="Driver" value="driver" />
          <Picker.Item label="Nanny" value="nanny" />
          <Picker.Item label="Parent" value="parent" />
        </Picker>
        <Text style={{fontSize:15,marginLeft:15}}>Title</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                   
                    keyboardType="numeric"
                    placeholderTextColor="#929292"
                    onChangeText={(title) => settitle(title)}
                />
            </View>
            <Text style={{fontSize:15,marginLeft:15}}>Message</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    
                    placeholderTextColor="#929292"
                    multiline={true}
                    onChangeText={(message) => setmessage(message)}
                />
            </View>
            <Text style={styles.error}>{emptyFields}</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
                <Text style={styles.loginText}>Confirm</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('charts')}  >
        <Text style={styles.loginText}>Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('chart')}  >
        <Text style={styles.loginText}>Trips Management</Text>
      </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogout()}  >
        <Text style={styles.loginText}>Log Out</Text>
      </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flex: 1,
        backgroundColor: "#F9F2F2",
       

    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        borderWidth: 1,
        borderColor: '#b0003a',
        borderRadius: 10,
        width: "100%",
        height: 45,
        alignSelf: "center",
        backgroundColor: "#fff",   //"#C4C4C4",
        marginTop: 5,
        //opacity: 0.5,
    },
    
    Picker: {
        width:"75%",
        marginVertical:10,
        borderRadius:10,
        height:30,
        borderWidth:1,
        alignContent:"center",
        alignSelf:"center",
        
     },

    TextInput: {
        height: 50,
        alignItems: "flex-start",
        padding: 10,
        marginLeft: 10,
        

    },

    forgot_button: {
        height: 30,
        marginBottom: 15,
        color: '#1e90ff',

    },
    error: {
        padding: 1,

        color: '#dc143c',
        fontSize: 11,
        alignItems: 'flex-start',
        justifyContent: 'center'
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
