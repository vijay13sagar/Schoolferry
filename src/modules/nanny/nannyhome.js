import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, TouchableOpacity,Linking, StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';

export default class Triplist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/nanny/tripdetails/${token}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { data, isLoading } = this.state;

    return (

      <View style={{ flex: 1, padding: 3, backgroundColor: "#F9F2F2", }}>
        <Loader loading = {isLoading}/>
        <StatusBar
         barStyle = "light-content" hidden = {false} backgroundColor = "#e91e63" translucent = {true}
      />
        <View style={styles.pendingTrips}>
        <Text style={styles.tripsTitleText}>Today's Trips</Text>
        <Text style={styles.startTripText}>Click to see Trip details</Text>
      </View>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Card style= { item.endedTripAt ? styles.card2 :styles.card}>
                  <CardItem style={item.endedTripAt ? {backgroundColor:'lightgrey'}:{backgroundColor:'white'}} button disabled={item.endedTripAt ? true : false} onPress={() => this.props.navigation.navigate('Tripdetails', { item: item })}>
                    <Body style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        Trip Id :
                      </Text>
                      <Text style={{ fontSize: 17, marginLeft: 5, fontWeight: '700' }}>
                        {
                          item.trip_id
                        }
                      </Text>
                      {item.endedTripAt ?
                      <Text style={{color:'white',fontWeight:'700',fontSize:17,marginLeft:40}}>Trip Completed</Text>
                       :
                       <Text style={{marginLeft:40}}>
                       {item.startedTripAt ?<Text style={{color:'black',fontWeight:'700',fontSize:17}}>Trip Started</Text> : null}
                     </Text>}
                {item.endedTripAt ? null : <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{marginLeft:"35%"}}
                />}
                    </Body>
                  </CardItem>
                </Card>
              )}
            />
          )}
        <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
          <Text style={styles.loginText}>Call Admin</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
  },
  cardbox: {
    padding: 8,
    width: "80%",
    height: "30%",
    flex: 1,
    alignSelf: "center",
  },
  CallBtn: {
    width: "80%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32cd32",
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  TextInput: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: 10,
  },
  pendingTrips: {
    backgroundColor: "#fff",
    height: 140,
    marginTop: 50,
    width: '90%',
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10

  },
  tripsTitleText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: "bold"
  },
  startTripText: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,

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
  },
  title: {
    position: 'absolute',
    marginTop: 65,
    marginBottom: 0,
    marginHorizontal: 20,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  }, time: {
    width: '20%',
    marginVertical: 20,
    position: 'absolute',
    backgroundColor: 'green',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    bottom: 0,
    borderRadius: 20,
    marginLeft: 20
  },
  card: {
    width: '80%',
    alignSelf: 'center',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },
  card2: {
    width: '80%',
    alignSelf: 'center',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'lightgrey',
    marginTop:10,
  },
  datestyle: {
    alignSelf: 'center',
    fontSize: 25
  },
  loginText: {
    color: 'black',
    fontSize: 15,
    // fontWeight:'700'
  },
});