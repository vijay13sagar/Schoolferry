import React, {useState} from 'react';
import { Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from '../components/style';

export default function change_pwd() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [{value_error}, setError] = useState('');

  const handlePress = () => {
    if (!value1 || !value2) {
      setError({value_error: 'Password Field Cannot be Empty'});
      return value_error;
    }
    if (value1 !== value2) {
      setError({value_error: 'Both Fields should be same'});
      return value_error;
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
        style={
          ({alignItems: 'center', justifyContent: 'center'}, styles.loginBtn)
        }
        onPress={handlePress}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
