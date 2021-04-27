import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';

const Driver = ({ route }) => {
  const [lat, setLatitude] = useState(18.1083);
  const [lon, setLongitude] = useState(83.3799);
  const [LATLNG, setLATLNG] = useState({ latitude: 18.999, longitude: 81.992 });
  const [region, setRegion] = useState({
    latitude: 18.999,
    longitude: 81.992,
    latitudeDelta: 0.0011 * 5,
    longitudeDelta: 0.0011 * 3,
  });

  const fetchApi = async () => {
    let tripid = await route.params.tripId;
    axios
      .get(`${Ngrok.url}/api/driver/tracking/${tripid}`)
      .then(function (response) {
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
        setLATLNG({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      })
      .catch(function (error) {
        console.log('error', error.message);
      })
      .finally(function () { });
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
        followsUserLocation
        mapType="standard"
        pitchEnabled
        rotateEnabled
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0011 * 5,
          longitudeDelta: 0.0011 * 3,
        }}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0001 * 8,
          longitudeDelta: 0.0008,
        }}>
        <MapView.Circle
          center={{
            latitude: lat,
            longitude: lon,
          }}
          fillColor={'blue'}
          radius={1}
          strokeColor={'blue'}
          strokeWidth={2}
        />
        <MapView.Circle
          center={{
            latitude: lat,
            longitude: lon,
          }}
          fillColor={'rgba(230,238,255,0.3)'}
          radius={12}
          strokeColor={'blue'}
          strokeWidth={1.5}
        />
        <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          image={require('../../assets/car.png')}></Marker>
      </MapView>
    </View>
  );
};

export default Driver;
