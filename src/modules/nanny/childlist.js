import React, { Component } from 'react';
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
      isLoading: true
    };
  }
  render() {
    const { data, isLoading } = this.state;
    return (
      <View style={styles.cont}>
          <FlatList
            data={this.props.route.params.childList}
            keyExtractor={(item) => item.childId}
            renderItem={({ item }) => (

              <Card style={styles.nannychild}>
                <CardItem button onPress={()=>this.props.navigation.navigate('Child Details',{item:item})}>
                  <Body style={{ flexDirection: 'row' }}>
                    <Image style={styles.payicon} source={{uri:'https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png'}} />
                    <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 100 }}>
                    { item.childId } , {item.childName}
                </Text>
                  </Body>
                </CardItem>
              </Card>
        // <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props.navigation.navigate('Child Details',{item:item})}>
        //   <Text style={styles.loginText}>{ item.childId } , {item.childName}</Text>
        // </TouchableOpacity>
            )}
          />
      </View>
     
    );
  }
};
