import React, { Component,useState } from 'react';
import { ActivityIndicator,TouchableOpacity, Image,FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/style';

export default class ChildList extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      defimg:'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png',
    };
  }
  render() {
    const { data, isLoading ,defimg } = this.state;
    return (
      <View style={styles.cont}>
          <FlatList
            data={this.props.route.params.childList}
            keyExtractor={(item) => item.childId}
            renderItem={({ item }) => (

              <Card style={styles.nannychild}>
                <CardItem button onPress={()=>this.props.navigation.navigate('Child Details',{item:item})}>
                  <Body style={{ flexDirection: 'row' }}>
                    <Image style={styles.payicon} source={item.photoUrl == "NULL" || item.photoUrl == null ? { uri: (defimg) }:{ uri: (item.photoUrl) }} />
                    <Text style={styles.childcardtext}>
                    { item.childId } , {item.childName}
                </Text>
                  </Body>
                </CardItem>
              </Card>
            )}
          />
      </View>
     
    );
  }
};
