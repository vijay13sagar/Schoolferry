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
import styles from '../components/style';



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
    <View style={styles.cont}>
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
          Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

