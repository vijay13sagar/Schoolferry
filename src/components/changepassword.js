import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../components/style';
import AsyncStorage from '@react-native-community/async-storage';

export default function change_pwd({navigation}) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [{ value_error }, setError] = useState('');

  const handlePress = () => {
    if (!value1 || !value2) {
      setError({ value_error: 'Password Field Cannot be Empty' });
      return value_error;
    }
    else if (value1 !== value2) {
      setError({ value_error: 'Password does not match' });
      return value_error;
    }else if(value1===value2) {
      //Need the api for changing the password
      Alert.alert('Password successfully changed', 'Please Login', [
        {
          text: 'Proceed',
          onPress: () =>{
          AsyncStorage.removeItem('token');
          navigation.replace('Login');
          }
        },
      ]);
    }
  };
  return (
    <View style={styles.cont}>
      <View>
        <Text style={styles.text}>Enter your new password.</Text>
      </View>
      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#929292"
        onChangeText={(value1) => setValue1(value1)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Re-enter Password"
        placeholderTextColor="#929292"
        onChangeText={(value2) => setValue2(value2)}
      />
      <Text style={styles.error}>{value_error}</Text>
      <TouchableOpacity
        style={{ ...styles.loginBtn, marginTop: 10 }}
        onPress={handlePress}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
