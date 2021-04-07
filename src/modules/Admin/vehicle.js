import React, { Component } from 'react';
import { ActivityIndicator,StatusBar,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'
 

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
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props. navigation.navigate('Add_Vehicle')}>
         <Text style={styles.TextInput}>Add New Vehicles</Text>

       </TouchableOpacity>
       </View>
        {isLoading ? <ActivityIndicator/> : (
          
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
             
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
    </View>
      
    );
  }
};


