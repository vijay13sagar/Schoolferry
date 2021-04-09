import React, { Component } from 'react';
import { ActivityIndicator, StatusBar,Alert, TouchableOpacity, FlatList, Text, View } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import moment from 'moment';
import styles from '../../components/styles_admin';

const today = new Date();
const TD = moment(today).format('DD-MM-YYYY');
export default class Home_page extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }
  
  
  
  componentDidMount() {
  
    this._unsubscribe = this.props.navigation.addListener('focus', () => {

    fetch(`${Ngrok.url}/api/admin/today/trips`)
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json });
      console.log("json",json)
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
      });
      
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  
  onpressHandler = () => {
    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/admin/trips`,
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
         data: {
          }
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert('Trip Generation Successful',)
          }

          console.log("response", response.status);
        })
        .catch(function (error) {
      
          console.log(error);
        })
    }
    catch (error) {
      console.log("errordetails", error);
    }
  }
  render() {
    const { data, isLoading } = this.state;
    
    
  
  

    return (
      
      <View style={styles.container1}>
        <StatusBar
          barStyle="light-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor='#FF5C00'
          //Background color of statusBar only works for Android
          translucent={false}
        //allowing light, but not detailed shapes

        />
        <Text style={{ alignSelf: "center" }}>{TD}</Text>
        <View>
          <TouchableOpacity style={styles.loginBtn} onPress={this.onpressHandler} >
            <Text style={styles.TextInput}>Schedule Trips</Text>
            


          </TouchableOpacity>
        </View>
        <View>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={data}
              keyExtractor={({ driver_id}, index) => driver_id}
              renderItem={({ item }) => (
                <Card style={{ flexDirection: "column"}}>
                  <CardItem button onPress={() => this.props.navigation.navigate('Trip_Details', { item: item })}>
                    <Body>
                      <Text style={{ flexDirection: 'row' }}>
                      
                        Trip Number:-{
                          item.trip_id
                        }    Driver:-{
                          item.driver_name
                        }
                      </Text>
                    </Body>
                  </CardItem>

                </Card>
              )}
            />
          )}
        </View>
       
      </View>

    );
  }
};
