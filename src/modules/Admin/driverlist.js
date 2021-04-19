import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, Image
  ,View } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

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
    fetch(`${Ngrok.url}/api/admin/home/drivers`)
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
    const img = 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg';
   

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
                <Text>
                   {
                     item.name
                   }
                </Text>
                {/* <Image style={styles.licence1} source={{ uri: img }} /> */}
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