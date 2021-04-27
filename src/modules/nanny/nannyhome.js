import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, TouchableOpacity, Linking, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';
import axios from 'axios';

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
    var self = this;
    axios
      .get(`${Ngrok.url}/api/nanny/tripdetails/${token}`)
      .then(function (response) {
        self.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log("error", error.message);
      })
      .finally(function () {
        self.setState({ isLoading: false });
      });
  }
  render() {
    const { data, isLoading } = this.state;

    return (

      <View style={styles.container}>
        <Loader loading={isLoading} />
        <StatusBar
          barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
        />
        <View style={styles.headingcontainer}>
          <Text style={styles.tripsTitleText}>Today's Trips</Text>
          <Text style={styles.startTripText}>Click to see Trip details</Text>
        </View>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.trip_id}
            renderItem={({ item }) => (
              <Card style={item.endedTripAt ? styles.card2 : styles.card}>
                <CardItem style={item.endedTripAt ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' }} button disabled={item.endedTripAt ? true : false} onPress={() => this.props.navigation.navigate('Tripdetails', { item: item })}>
                  <Body style={{ flexDirection: 'row' }}>
                    <Text style={styles.tripstartedtext}>
                      Trip Id :{' '} {item.trip_id}
                    </Text>
                    {item.endedTripAt ?<Text style={styles.tripendedtext}>{'     '}Trip Completed</Text> 
                  : <Text >
                        {item.startedTripAt ? <Text style={styles.tripstartedtext}>{'     '}Trip Started</Text> 
                        : <Text>{'                                '}<Ionicons name="chevron-forward-outline"
                          color="#000" size={25}
                        /></Text>}
                      </Text>}
                  </Body>
                </CardItem>
              </Card>
            )}
          />
        )}
        <TouchableOpacity style={styles.CallBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
          <Text style={styles.loginText}>Call Admin   <Ionicons name="call"
            color="white" size={20}
          /></Text>
        </TouchableOpacity>
      </View>
    );
  }
};
