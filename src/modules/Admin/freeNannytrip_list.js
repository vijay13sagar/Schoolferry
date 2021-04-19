import React, { Component } from 'react';
import { ActivityIndicator, Modal ,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin'


export default class freeNannytrip_list extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
 
  componentDidMount() {
   ;
    
    fetch(`${Ngrok.url}/api/admin/trip/available/nannies`)
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
    const { modalVisible } = this.state;
    const tripid1 = this.props.route.params.s;

    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View >  
        <Card >
        <CardItem button onPress = {()=>this.props.navigation.navigate('Edit_Nanny',{tripid1:tripid1,item:item})}>
              <Body>
                <Text>
                Name:-{item.name}
                </Text>
                
              </Body>
            </CardItem>
            </Card>
           
             
           </View>
            )}
          />
        )}
        
      </View>
    );
  }
};

