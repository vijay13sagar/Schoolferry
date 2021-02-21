import React from 'react';
import { StyleSheet, View, Dimensions,Image, Platform, SafeAreaView } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import PubNubReact from 'pubnub-react';
//import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const duration=500;
const ASPECT_RATIO = width  / height;
const LATITUDE = 17.8243;
const LONGITUDE = 83.3564;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const pubnub = new PubNubReact({
//   publishKey: 'pub-c-2743f615-6897-4dd1-b191-2bf5073277ea',
//   subscribeKey: 'sub-c-597ec1f0-7036-11eb-9994-e2667f94577d',
// });

console.disableYellowBox = true;

class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      followUserLocation:true,
      coordinate: ({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-2743f615-6897-4dd1-b191-2bf5073277ea',
      subscribeKey: 'sub-c-597ec1f0-7036-11eb-9994-e2667f94577d',
  });

  this.pubnub.init(this);
    //pubnub.init(this);
    // Replace "X" with your PubNub Keys
    
  }

  // code to receive messages sent in a channel
 async componentDidMount() {
   // await this.pubnub.init(this);
    this.subscribeToPubNub();
    
  }

  subscribeToPubNub = () => {
    console.log(this)
    const { coordinate } = this.state;
    console.log(coordinate)
    this.pubnub.subscribe({
      channels: ['location'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      console.log(this)
      const { latitude, longitude } = msg.message;
      console.log(latitude)
      const newCoordinate = { latitude, longitude };
 console.log(newCoordinate);
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(newCoordinate, duration);
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        latitude,
        longitude,
      });
      console.log('hi');
    });
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
          <MapView
            style={styles.maplook}
            showUserLocation
            followUserLocation
            loadingEnabled

            
            ref={c => (this.mapView = c)}
            region={this.state.latitude ? this.getMapRegion() : null}
            
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    ...StyleSheet.absoluteFillObject,
    // width:350,
    // marginTop:30,
    // height:350,
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  maplook:{
    ...StyleSheet.absoluteFillObject,
    // width:350,
    // height:350,
    // justifyContent:'center',
    // alignSelf:'center',
  },

});

export default Tracker;
