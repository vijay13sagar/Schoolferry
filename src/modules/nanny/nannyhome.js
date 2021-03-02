import React, { Component } from 'react';
import { ActivityIndicator,StatusBar,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';

export default class Triplist extends Component  {
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
    <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
    return (
      
      <View style={{ flex: 1, padding: 3 ,backgroundColor: "#F9F2F2",}}>
        <ScrollView>
        <View style={styles.cardbox}>
          <Card>
            <CardItem>
            <Text>Rides Remaining--</Text>
            <Text>1</Text>
            </CardItem>
          </Card>
        </View>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              //<Text>{item.title}, {item.releaseYear}</Text>
              // <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props.navigation.navigate('driver_Details',{item:item})}>
              // <Text style={styles.loginText}>{item.title}</Text>
          // </TouchableOpacity>
          // <View style={styles.card}>
            //{/* <Text style={styles.title}>{item.title}</Text> */}
            //{/* <Text style={styles.time}>{item.time}</Text> */}
        // </View>onPress = {()=>this.props.navigation.navigate('driver_Details',{item:item})}
        <Card >
        <CardItem button onPress = {()=>this.props.navigation.navigate('Tripdetails',{item:item})}>
              <Body >
                <Text>
                   {
                     item.trip_id
                   }
                </Text>
              </Body>
            </CardItem>
            </Card>
            )}
          />
        )}
        </ScrollView>
        <View style={styles.cardbox}>
          <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,alignSelf:'center'}}>Performance</Text>
          <Card>
            <CardItem>
            <Text>Total Successful Rides-- 342</Text>
            </CardItem>
            <CardItem>
            <Text>Total Unsuccessful Rides-- 4</Text>
            </CardItem>
          </Card>
        </View>
        
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex:1,
      backgroundColor: "#F9F2F2",
      alignItems: "center",
    },
    cardbox:{
      padding: 8,
      width:"80%",
      height:"30%",
      flex:1,
      //backgroundColor: "#F9F2F2",
        alignSelf: "center",
      },
    TextInput: {
      height: 50,
      alignItems:"center",
      justifyContent:"center",
      padding: 10,
      marginLeft:10,
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
      title:{
        position:'absolute',
        marginTop:65,
        marginBottom:0,
        marginHorizontal:20,
        fontSize: 30,
        color:'white',
        fontWeight:'bold'
    }, time:{
        width:'20%',
        marginVertical: 20,
        position:'absolute',
        backgroundColor:'green',
        color:'white',
        fontSize: 25,
        fontWeight:'bold',
        bottom:0,
        borderRadius:20,
        marginLeft: 20
    },
    datestyle:{
      alignSelf:'center',
      fontSize:25
    },
    loginText:{
      color:'black',
      fontSize:15,
     // fontWeight:'700'
    }
});