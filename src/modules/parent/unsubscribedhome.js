import React from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../components/style';

const Unsubhomescreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.980120875177654,
          longitude: 77.5876170887363,
          latitudeDelta: 0.0922 * 5,
          longitudeDelta: 0.0421 * 3,
        }}>
        <Marker
          coordinate={{
            latitude: 12.919032364316546,
            longitude: 77.75175975449223,
          }}
          image={require('../../assets/school.png')}
          title={'Basil Woods International School'}
        />
        <Marker
          coordinate={{
            latitude: 12.899553897414407,
            longitude: 77.65187436798485,
          }}
          image={require('../../assets/school.png')}
          title={'SVR Chinmaya School'}
        />
        <Marker
          coordinate={{
            latitude: 12.91398054034311,
            longitude: 77.63500419682072,
          }}
          image={require('../../assets/school.png')}
          title={'Lawrence High School (ICSE)'}
        />
        <Marker
          coordinate={{
            latitude: 12.97603054085986,
            longitude: 77.6651062438763,
          }}
          image={require('../../assets/school.png')}
          title={'The International School Banglore'}
        />
      </MapView>
      <View style={styles.textview}>
        <Text style={styles.note}>
          * Click on icons to see schools we cater service to
        </Text>
        <Text style={styles.text1}>
          Check service availability at your area
        </Text>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('location')}>
        <Text style={styles.loginText}>Check Availability</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Unsubhomescreen;
