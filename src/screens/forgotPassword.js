import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../components/style';

export default function forgotPassword({navigation}) {
  const [value, setValue] = useState('');
  const [{ value_error }, setError] = useState('');

  const handlePress = () => {
    if (!value) {
      setError({ value_error: 'Email/Phone Field Cannot be Empty' });
      return value_error;
    }else{
      navigation.navigate('OTPscreen', { item: value })
    }
  };

  return (
    <View style={styles.cont}>
      <View>
        <Text style={styles.text}>
          Enter your Email/Mobile and we will send you a new password.
        </Text>
      </View>

      <TextInput
        style={styles.TextInput}
        placeholder="Email/Phone"
        maxLength={10}
        placeholderTextColor="#929292"
        onChangeText={(value) => setValue(value)}
        
      />
      <Text style={styles.error}>{value_error}</Text>

      <TouchableOpacity
        style={
          ({ alignItems: 'center', justifyContent: 'center' }, styles.loginBtn)
        }
        onPress={handlePress}>
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}
