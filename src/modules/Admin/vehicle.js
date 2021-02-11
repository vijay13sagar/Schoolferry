import React, { Component } from 'react';
import { ActivityIndicator,StatusBar,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';

export default class vehicleList extends Component  {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${Ngrok.url}/api/admin/home/vehicles`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        console.log("json",json)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
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
        backgroundColor= '#e91e63'     
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
        
        <ScrollView>
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
            
        // </View>
        <Card>
        <CardItem button onPress = {()=>this.props.navigation.navigate('vehicle_Details',{item:item})}>
              <Body>
                <Text>
                   {
                     item.regNo
                   }
                </Text>
              </Body>
            </CardItem>
            </Card>
            )}
          />
        )}
        </ScrollView>
        
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props. navigation.navigate('Add_Vehicle')}>
         <Text style={styles.loginText}>Add New Vehicles</Text>

       </TouchableOpacity>
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
    }
});