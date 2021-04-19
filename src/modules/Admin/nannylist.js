import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import {  Card, CardItem, Body } from 'native-base';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin'

export default class nannyList extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${Ngrok.url}/api/admin/home/nannies`)
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

    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
             
        <Card>
        <CardItem button onPress = {()=>this.props.navigation.navigate('nanny_Details',{item:item})}>
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

