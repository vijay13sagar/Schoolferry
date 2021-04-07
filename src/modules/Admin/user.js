import React, { Component } from 'react';
import { ActivityIndicator,TouchableOpacity,StyleSheet,StatusBar, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
export default class userList extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${Ngrok.url}/api/admin/home/parents`)
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
      <View style={styles.container1}>
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor= '#FF5C00'     
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
      <Text style={{alignSelf:"center",marginTop:6,fontSize:20}}>List of customers</Text>
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
        <CardItem button onPress = {()=>this.props.navigation.navigate('user_Details',{item:item})}>
              <Body>
                <Text>
                   {
                     item.name
                   }
                </Text>
              </Body>
            </CardItem>
            </Card>
            )}
          />
        )}
    </View>
      
    );
  }
};


