import React from 'react';
import { StyleSheet,Text,TouchableOpacity, View, Platform, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import PubNubReact from 'pubnub-react';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const duration=500;
const LATITUDE = 18.1083;
const LONGITUDE = 83.3799;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const pubnub =  new PubNubReact({
  publishKey: 'pub-c-2743f615-6897-4dd1-b191-2bf5073277ea',
  subscribeKey: 'sub-c-597ec1f0-7036-11eb-9994-e2667f94577d',
});
pubnub.init(this);
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
  }
  componentDidMount() {
     this.watchLocation();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        channel: 'location',
      });
    }
    console.log('hi')
    console.log(this.state.latitude);
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  watchLocation = () => {
     const {coordinate } = this.state;
    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log(newCoordinate)
        console.log("hiiii")
        console.log(position.coords);
        if (Platform.OS === 'android') {
         //coordinate.timing(newCoordinate).start();
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate,duration); // 500 is the duration to animate the marker
          }
        } else {
           coordinate.timing(newCoordinate).start();
        }
        this.setState({
          latitude,
          longitude,
        });
        console.log(this.state.LATITUDE);
      },
      error => console.log(error),
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
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
          <TouchableOpacity style={styles.loginBtn} onPress={()=>this.props.navigation.navigate('Home',{refresh:true})}>
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
    width:"80%",
    height:"75%",
    alignSelf:'center',
    marginVertical:20,
    justifyContent:'flex-start',
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
    marginBottom:20,
  },
});
