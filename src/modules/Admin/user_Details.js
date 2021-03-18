import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar, ActivityIndicator, FlatList
} from 'react-native';
import { Card, CardList, Body, ListItem } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok'



export default function user_Details({ route, navigation }) {
  

  const [childlists, getData] = useState()
  console.log("this.props", route.params.item);


  useEffect(() => {
    let take1 = route.params.item.id
    console.log("token", take1);
    fetch(`${Ngrok.url}/api/parent/detail/childlist/${take1}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("cl", typeof (responseJson));
        console.log("cl", responseJson);
        getData(responseJson)
      })
      .catch(err => {

      });
  }, [])




  return (

    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={{ width: "70%",marginLeft:35  }}>
          <Text>Name</Text></View>

        <View style={styles.details}>
          <Text >

            {route.params.item.name}

          </Text>
        </View>

        <View style={{ width: "70%",marginLeft:35  }}>
          <Text>Email ID</Text></View>

        <View style={styles.details}>
          <Text>

            {route.params.item.email}

          </Text>
        </View>

        <View style={{ width: "70%",marginLeft:35 }}>
          <Text>Phone Number</Text></View>
        <View style={styles.details}>
          <Text >

            {route.params.item.contact}

          </Text>
        </View>
        {/* <View style={{ width: "70%",marginLeft:35  }}>
          <Text>Address</Text></View> */}

        {/* <View style={styles.details1}>
          <Text >

         {data.childName}

          </Text>
        </View> */}

        <Text style={{fontSize:15,marginTop:5}} > 

Child Details

</Text>
        
          <FlatList
            data={childlists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              // <Card style={{width:"100%",marginTop:5}}>
                <ListItem style={{backgroundColor:"white",width:"100%",marginTop:5}}
                 onPress= { () => navigation.navigate('child_Details',{item:item})}>
                  <Text>
                    {
                      item.childName
                    }
                  </Text>
                </ListItem>
              // </Card>

            )}
          />
        
      </View>
    </ScrollView>

  );

}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#F9F2F2",
   
  },

  contain: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F9F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignItems: "center",
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  details: {
    height: 40,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },
  details1: {
    height: 100,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },
  detailsAddress: {
    height: 100,
    backgroundColor: "#d3d3d3",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: '#ff5c8d',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"

  },
  TextInput: {
    width: "70%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 2,

  },
  error: {
    padding: 1,

    color: '#dc143c',
    fontSize: 11,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },


  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',

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
  loginBtn2: {
    width: "95%",

    height: 39,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 10,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
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