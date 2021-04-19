
import React, { useState} from 'react';
import { StatusBar,Alert,TouchableOpacity, Text, View } from 'react-native';
import geolocation from 'react-native-geolocation-service';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import* as ToastMessage from '../../constants/ToastMessages';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: 16.002, lng: 34.93 },
      error: null,
      isloading:true,
      showtoast:false,
      message:"Nope",
    }
  }
  componentDidMount() {

    this.interval = setInterval(() => { this.updateloc() }, 5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  Endtrip = async() => {
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
        .then( (response) => {
          this.setState({isloading:false});
          if (response.status == 200) {
            this.setState({showtoast:true});
            this.setState({message:ToastMessage.driveend});
          }
        })
        .catch(function (error) {
          console.log("ERROR", error);

        })
    }
    catch (error) {
      console.log("errordetails", error);
    }
    this.setState({showtoast:false});
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
    this.setState({
      ready: true,
      error:null,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
      isloading:false
    })
  }
  geoFailure = (err) => {
    this.setState({ error: err.message });
  }
  render() {
     const {isloading,message,showtoast}=this.state;
    return (
      <View style={styles.container}>
        <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
        {showtoast? (<ToastComponent type = {ToastMessage.success}  message = {message}/>): null}
        <Loader loading = {isloading}/>
        {/* { !this.state.ready && (
           <Text style={styles.big}>Using Geolocation in React Native</Text>
        )} */}
        { this.state.error && (
          <Text style={styles.big}>{this.state.error}</Text>
        )}
        { this.state.ready && (
          <View>
            <MapView
              style={{ height: "90%", width: "100%" }}
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
            <TouchableOpacity style={styles.loginBtn} onPress={()=>{
        this.Endtrip()
        this.props.navigation.navigate('Homey',{refresh:true})
        this.props.navigation.replace('Tripnotstarted',{refresh:true})
      }}>
              <Text style={styles.loginText}>End Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
