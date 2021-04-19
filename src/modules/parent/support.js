import * as React from 'react';
import {Text, View, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/style';

const Support = () => {
  return (
    <View style={{...styles.container, justifyContent:'center'}}>
      <View>
        <Text style={{fontSize: 19, textAlign: 'center', marginHorizontal: 10}}>
          If you have any complaint/query regarding our services, feel free to
          mail.
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
          Write a Mail <Ionicons name="mail" color="white" size={20} />
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 70}}>
        <Text style={{fontSize: 19, alignSelf: 'center', marginBottom: 10}}>
          Or you can call us{' '}
        </Text>
        <TouchableOpacity
          style={styles.CallBtn}
          onPress={() => {
            Linking.openURL('tel:8192856814');
          }}>
          <Text style={styles.loginText}>
            Make a Call <Ionicons name="call" color="white" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Support;
