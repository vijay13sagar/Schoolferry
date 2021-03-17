import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, {Marker, AnimatedRegion } from 'react-native-maps';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';

const Driver = ({ route }) => {
  const [lat, setLatitude] = useState(18.1083)
  const [lon, setLongitude] = useState(83.3799)
  const [LATLNG,setLATLNG] =useState({latitude: 18.999,
    longitude: 81.992})
  const [region,setRegion] =useState({
    latitude: 18.999,
    longitude: 81.992,
    latitudeDelta: 0.0011 * 5,
    longitudeDelta: 0.0011 * 3
    });

const fetchApi = async() => {
  //let token = await AsyncStorage.getItem('token')
   let tripid = await  route.params.tripId
   console.log('trip ID:', tripid)
   //${tripid}
  axios
    .get(`${Ngrok.url}/api/driver/tracking/${tripid}`)
    .then(function (response) {
      console.log("dat",response.data);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setLATLNG({latitude:response.data.latitude,longitude:response.data.longitude})
      console.log("latlng",LATLNG);
      console.log("dat",lat);
    })
    .catch(function (error) {
      // handle error
      console.log("error",error.message);
    })
    .finally(function () {
      // always executed
    });
};

  useEffect(() => {
    const interval = setInterval(() => {
      fetchApi();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        //showsUserLocation
        followsUserLocation
        mapType='standard'
        pitchEnabled
        rotateEnabled
        
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0011 * 5,
          longitudeDelta: 0.0011 * 3
        }}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.001 * 8,
          longitudeDelta: 0.001 * 7
        }}
      >
        <MapView.Circle
                center={{
                  latitude: lat,
                  longitude: lon,
                }}
                fillColor={'blue'}
                radius={2}
                strokeColor={'lightblue'}
                strokeWidth={2}
              />
              <MapView.Circle
                center={{
                  latitude: lat,
                  longitude: lon,
                }}
                fillColor={'rgba(230,238,255,0.3)'}
                radius={10}
                strokeColor={'lightblue'}
                strokeWidth={1}
              />
        {/* <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          //image={require('../../assets/school.png')}
        >
        </Marker > */}
      </MapView>
    </View>
  );
}

export default Driver;