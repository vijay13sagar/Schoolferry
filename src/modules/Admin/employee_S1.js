import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { event } from "react-native-reanimated";

export default function Employee_s1() {
  return (
    <View style={styles.container}>
      

      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#00BCD4"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />

      <TouchableOpacity style={styles.loginBtn}
        onPress={() => navigation.navigate('add_new_employee')}  >
        <Text style={styles.loginText}>Add Employee</Text>
      </TouchableOpacity>

    </View>
  );

}
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
    borderColor: '#4DAFCE',
    borderRadius: 15,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  error: {
    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  forgot_button: {
    height: 30,
    color: '#1e90ff',
  },

  loginBtn: {
    width: "60%",
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    backgroundColor: "#4DAFCE",
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});