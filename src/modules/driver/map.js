import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const duration = 500;
const LATITUDE = 18.1083;
const LONGITUDE = 83.3799;
const LATITUDE_DELTA = 0.0051;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Trackee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
    //this.params = this.props.navigation.state.params;
  }
  componentDidMount() {
    this.watchLocation();
    this.updateloc();
    this.interval = setInterval(() => this.updateloc(), 10000)
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    clearInterval(this.interval)
  }
  watchLocation = () => {
    const { coordinate } = this.state;
    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log("newcoo", newCoordinate)
        console.log("pos.coord", position.coords);
        if (Platform.OS === 'android') {
          //coordinate.timing(newCoordinate).start();
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate, duration); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        this.setState({
          latitude,
          longitude,
        });
        console.log("this.state.lat", this.state.latitude);
      },
      error => console.log("123line", error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 30,
      }
    );
  };
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  updateloc = async() => {
    console.log("up", this.state.latitude);
    let token = await AsyncStorage.getItem('token')
    try {
      fetch(`${Ngrok.url}/api/driver/tracking`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          driverid: token,
          tripid: this.props.route.params.tripid,
          latitude: Number(this.state.latitude),
          longitude: Number(this.state.longitude)
        })
      })
        .then(function (response) {
          if (response.status == 200) {
            //Alert.alert('Location Updated')
          }

          console.log("response for tracking", response.status);
        })
        .catch(function (error) {
          console.log("ERROR", error);

        })
    }
    catch (error) {
      console.log("errordetails", error);
    }
  };
  Endtrip = () => {
    try {
      fetch(`${Ngrok.url}/api/driver/trip/end`, {
        "method": "POST",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tripid: this.props.route.params.tripid,
        })
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert('Trip Ended')
          }

          console.log("response for end trip", response.status);
        })
        .catch(function (error) {
          console.log("ERROR", error);

        })
    }
    catch (error) {
      console.log("errordetails", error);
    }
  };
  render() {
    console.log("tripid",this.props.route.params.tripid);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}>
            <Marker coordinate={this.getMapRegion()} />
            {/* <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              
              coordinate={this.state.coordinate}
            /> */}
          </MapView>
          <TouchableOpacity style={styles.loginBtn} onPress={() => {
            this.Endtrip()
            //this.props.navigation.replace('Home',{refresh:true})
            this.props.navigation.navigate('Homey', { refresh: true })
            //this.props.navigation.navigate('Tripnotstarted',{refresh:true})
          }}>
            <Text>End Trip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: "80%",
    height: "75%",
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'flex-start',
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
