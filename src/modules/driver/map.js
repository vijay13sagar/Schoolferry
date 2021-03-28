
import React, { useState} from 'react';
import { StyleSheet,Alert,TouchableOpacity, Text, View } from 'react-native';
import geolocation from 'react-native-geolocation-service';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      isloading:true
    }
  }
  componentDidMount() {

    this.interval = setInterval(() => { this.updateloc() }, 5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  Endtrip = () => {
    this.setState({isloading:true})
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
          this.setState({isloading:false})
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
  updateloc = async() => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 2000,
      maximumAge: 60 * 60 * 24
    };
    //this.setState({ ready: false, error: null });
    geolocation.getCurrentPosition(this.geoSuccess,
      this.geoFailure,
      geoOptions);
      this.setState({isloading:false})
      console.log("load",this.state.isloading);
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
                    latitude: Number(this.state.where.lat),
                    longitude: Number(this.state.where.lng)
                })
            })
                .then(function (response) {
                    if (response.status == 200) {
                        //Alert.alert('Location Updated')
                    }

                    console.log("response for tracking", response.status);
                })
                .catch(function (error) {
                    console.log("ERR", error);

                })
        }
        catch (error) {
            console.log("errordetails", error);
        }
  }
  geoSuccess = (position) => {
    console.log(position.coords.latitude);
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
      isloading:false
    })
  }
  geoFailure = (err) => {
    this.setState({ error: err.message });
  }
  render() {
    return (
      <View style={styles.container}>
        <Loader loading = {this.state.isloading}/>
        {/* { !this.state.ready && (
           <Text style={styles.big}>Using Geolocation in React Native</Text>
        )} */}
        { this.state.error && (
          <Text style={styles.big}>{this.state.error}</Text>
        )}
        { this.state.ready && (
          <View>
            {/* <Text >{
              `Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`
            }</Text> */}
            <MapView
              style={{ height: 600, width: 450 }}
              //showsUserLocation
              followsUserLocation
              mapType='standard'
              pitchEnabled
              rotateEnabled
              region={{
                latitude: this.state.where.lat,
                longitude: this.state.where.lng,
                latitudeDelta: 0.0001 * 8,
                longitudeDelta: 0.0001 * 7
              }}
            >

              <Marker
                coordinate={{ latitude: this.state.where.lat, longitude: this.state.where.lng }}
              //image={require('../../assets/school.png')}
              >
              </Marker >
            </MapView>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{//this.props.navigation.replace('Home',{refresh:true})
        this.Endtrip()
        this.props.navigation.navigate('Homey',{refresh:true})
        this.props.navigation.replace('Tripnotstarted',{refresh:true})
      }}>
              <Text>End Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    //alignItems: 'center',
    justifyContent: 'center'
  },
  big: {
    fontSize: 48
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
