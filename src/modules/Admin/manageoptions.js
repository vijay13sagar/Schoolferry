import React from "react";
import { Text, View, Image, Alert, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin'

const Homescreen = ({ navigation }) => {

  return (
    <View style={styles.container1}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      <ScrollView>
        <View style={{ alignSelf: 'center', alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../../assets/analytics.png')} />
        </View>
        <View style={{ marginVertical: 20, }}>
          <Card style={styles.card1}>
            <CardItem button onPress={() => navigation.navigate('RevStats')}>
              <Body style={{ flexDirection: 'row' }}>
                <Image style={styles.payicon} source={require('../../assets/RevenueIcon.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 100 }}>
                  Revenue Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{ marginLeft: 70 }}
                />
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.card1}>
            <CardItem button onPress={() => {
              navigation.navigate('SubStats')
            }}>
              <Body style={{ flexDirection: 'row' }}>
                <Image style={styles.payicon} source={require('../../assets/StatsIcon.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 100 }}>
                  Subscription Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{ marginLeft: 38 }}
                />
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.card1}>
            <CardItem button onPress={() => {
              navigation.navigate('TripStats')
            }}>
              <Body style={{ flexDirection: 'row' }}>
                <Image style={styles.payicon} source={require('../../assets/TripIcon.png')} />
                <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 100 }}>
                  Trip Stats :
                </Text>
                <Ionicons name="chevron-forward-outline"
                  color="#000" size={25}
                  style={{ marginLeft: 102 }}
                />
              </Body>
            </CardItem>
          </Card>
        </View>

      </ScrollView>
    </View>
  );
}

export default Homescreen;

