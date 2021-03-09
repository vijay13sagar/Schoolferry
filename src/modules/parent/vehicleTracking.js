import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import axios from 'axios';

const Driver = () => {
const [lat, setLatitude] = useState(37.42215078611507)
const [lon, setLongitude]= useState(-122.08427209309676)

const fetchApi = async() => {
  //let token = await AsyncStorage.getItem('token')
  axios
    .get(`${Ngrok.url}/api/driver/tracking/T001`)
    .then(function (response) {
      console.log("dat",response.data);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
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
<View style={{flex:1 }}>
<MapView

style={ {
  // ...StyleSheet.absoluteFillObject,
  width:"80%",
  height:"75%",
  alignSelf:'center',
  marginVertical:20,
  justifyContent:'flex-start',
}}
initialRegion={{
latitude: lat,
longitude: lon,
latitudeDelta: 0.0011 *5,
longitudeDelta:0.0011 *3
}} > 
<Marker
coordinate={{ latitude:lat, longitude: lon}}
>
</Marker >
</MapView>
</View>
);
}

export default Driver;