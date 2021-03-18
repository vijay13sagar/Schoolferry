import React, { Component } from 'react';
import { ActivityIndicator, StatusBar,Alert, TouchableOpacity, StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import moment from 'moment';
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
          //  date :TD,
        //   name: name,
        //   email: email,
        //   contact: contact,
        //   address: ADR,
        //   experience: EXP,
        //   photourl: "NULL",
        //   idproofurl: "NULL",
        //   password: password


         }
      })
        .then(function (response) {
          if (response.status == 200) {
            Alert.alert('Trip Generation Successful',)
          }

          console.log("response", response.status);
        })
        .catch(function (error) {
          // console.log(error.response.status) // 401
          // console.log(error.response.data.error) //Please Authenticate or whatever returned from server
          // if (error.response.status == 401) {
          //   //redirect to login
          //   Alert.alert('Trip Generation Failed!')
          // }
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
      
      <View style={styles.Container}>
        <StatusBar
          barStyle="light-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor='#e91e63'
          //Background color of statusBar only works for Android
          translucent={false}
        //allowing light, but not detailed shapes

        />
        <Text style={{ alignSelf: "center" }}>{TD}</Text>
        <View>
          <TouchableOpacity style={styles.Schedule} onPress={this.onpressHandler} >
            <Text style={styles.loginText}>Schedule Trips</Text>
            


          </TouchableOpacity>
        </View>
        <View>
      
        <ScrollView>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Card style={{ flexDirection: "column" }}>
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
        </ScrollView>

        </View>
       
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
  TextInput: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: 10,

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

  Schedule: {
    width: "40%",
    borderRadius: 10,
    height: 38,
    alignItems:"center",
    justifyContent:"center",
  
    backgroundColor: "#ff5c8d",
    alignSelf:"center",
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
  }
});