import * as React from 'react';
import { Text, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/style';

const Support = () => {
  return (
    <View style={{ ...styles.container, justifyContent: 'center' }}>
      <View>
        <Text style={styles.mailSupportText}>
          If you have any complaint/query regarding our services, feel free to
          mail
        </Text>
      </View>
      <TouchableOpacity
        style={styles.mailBtn}
        onPress={() =>
          Linking.openURL(
            'mailto:AdminSchoolferry@gmail.com?subject=SendMail&body=Hi Admin,',
          )
        }
        title="AdminSchoolferry@gmail.com">
        <Text style={styles.loginText}>
          {' '}
          Write a Mail <Ionicons name="mail" color="white" size={19} />
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 70 }}>
        <Text style={styles.mailSupportText}>
          Or call us{' '}
        </Text>
        <TouchableOpacity
          style={styles.mailBtn}
          onPress={() => {
            Linking.openURL('tel:8192856814');
          }}>
          <Text style={styles.loginText}>
            Make a Call <Ionicons name="call" color="white" size={19} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Support;
