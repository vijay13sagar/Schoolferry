import React from 'react';
import {Text, View, Image,} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/style';

const Homescreen = ({route, navigation}) => {
  const childid = route.params.childid;
  return (
    <View style={styles.container}>
      <View style={styles.PendingTrips}>
        <Text style={styles.tripsTitleText}>Select a Payment Option</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <Card style={styles.card1}>
          <CardItem
            button
            onPress={() =>
              navigation.navigate('Upiscreen', {
                maxDate: route.params.maxDate,
                tomorrow: route.params.tomorrow,
                f: route.params.f,
                costly: route.params.costly,
              })
            }>
            <Body style={{flexDirection: 'row'}}>
              <Image
                style={styles.payicon}
                source={require('../../assets/UPI1.png')}
              />
              <Text style={{fontSize: 17, fontWeight: '700', marginLeft: 100}}>
                Pay with UPI :
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                color="#000"
                size={25}
                style={{marginLeft: 70}}
              />
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.card1}>
          <CardItem
            button
            onPress={() => {
              navigation.navigate('PaymentScreen', {
                maxDate: route.params.maxDate,
                tomorrow: route.params.tomorrow,
                f: route.params.f,
                costly: route.params.costly,
                childid: childid,
              });
            }}>
            <Body style={{flexDirection: 'row'}}>
              <Image
                style={styles.payicon}
                source={require('../../assets/card.png')}
              />
              <Text style={{fontSize: 17, fontWeight: '700', marginLeft: 100}}>
                Pay with Card :
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                color="#000"
                size={25}
                style={{marginLeft: 60}}
              />
            </Body>
          </CardItem>
        </Card>
      </View>
    </View>
  );
};

export default Homescreen;
