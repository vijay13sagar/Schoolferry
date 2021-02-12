
import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
export default function change_pwd() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [{ value_error }, setError] = useState("");
  const handlePress = () => {
    if (!value1 || !value2) {
      setError({ value_error: "Password Field Cannot be Empty" })
      return value_error
    }
    if (value1 !== value2) {
      setError({ value_error: "Both Fields should be same" })
      return value_error
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#E91E63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes
      />
      <View >
        <Text style={styles.text}>
          Enter your new password.
         </Text>
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#929292"
          onChangeText={(value1) => setValue1(value1)}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.TextInput}
          placeholder="Re-enter Password"
          placeholderTextColor="#929292"
          onChangeText={(value2) => setValue2(value2)}
        />
      </View>
      <Text style={styles.error}>{value_error}</Text>
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }, styles.loginBtn}
        onPress={handlePress} >
        <Text style={styles.loginText}>
          Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    width: '90%',
    marginLeft: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
  text: {
    //marginTop: 100,
    //marginLeft: 25,
    fontSize: 18,
    alignSelf: 'center'
  },
  error: {
    color: '#DC143C',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#FF5C8D',
    borderRadius: 10,
    width: "80%",
    height: 45,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  loginBtn: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#FF5C8D",
  },
  loginText:{
    fontSize:15,
  }
});