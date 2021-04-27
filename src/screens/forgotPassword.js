import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../components/style';

export default function forgotPassword() {
  const [value, setValue] = useState('');
  const [{ value_error }, setError] = useState('');

  const handlePress = () => {
    if (!value) {
      setError({ value_error: 'Email/Phone Field Cannot be Empty' });
      return value_error;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Enter your Email/Mobile and we will send you a new password.
        </Text>
      </View>

      <TextInput
        style={styles.TextInput}
        placeholder="Email/Phone"
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
