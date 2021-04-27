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
      var self=this;
      axios
      .get(`${Ngrok.url}/api/admin/today/trips`)
      .then(function (response) {
        self.setState({ data: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("error",error.message);
      })
      .finally(function () {
        self.setState({ isLoading: false });
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

        
        })
        .catch(function (error) {
      
          
        })
    }
    catch (error) {
      
    }
  }
  render() {
    const { data, isLoading } = this.state;
    
  
  
  

    return (
      
      <View style={styles.container1}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor='#FF5C00'
          translucent={false}

        />
        <Text style={{ alignSelf: "center" }}>{TD}</Text>
        <View>
          <TouchableOpacity disabled={data? false : true} style= { data? styles.loginBtn :styles.card2} onPress={this.onpressHandler} >
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