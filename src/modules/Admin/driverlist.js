import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, Image
  ,View } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
export default class driverList extends Component  {

  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    var self=this;
    axios
    .get(`${Ngrok.url}/api/admin/home/drivers`)
    .then(function (response) {
      self.setState({ data: response.data });
      console.log("faf",response.data);
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
      self.setState({ isLoading: false });
    });
    
  }

  render() {
    const { data, isLoading } = this.state;
    const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0E1095uZGr8SfFNizuXsMxB3S9iNuisOtw&usqp=CAU';
   

    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
        <Card>
        <CardItem button onPress = {()=>this.props.navigation.navigate('driver_Details',{item:item})}>
              <Body>
                <View style={{flexDirection:"row"}}>      
                <Image style={styles.licence2} source={item.photoUrl == "NULL" ? { uri: (img) }:{ uri: (item.photoUrl) }} />         
                <View >     
                   <Text style={{marginLeft:10,fontSize: 15,marginTop:50,
        color: "black",
        fontWeight: '700',}}>
                 
                   {
                      item.name
                   }
                   
                   
                </Text>
                <Text style={{alignSelf:"center",marginLeft:10,fontSize: 12,
        color: "grey",
        fontWeight: '600',marginBottom:6}}>
                 
                
                   {
                      item.contact
                   }
                </Text>
                </View>
                </View>

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