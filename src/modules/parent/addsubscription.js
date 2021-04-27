import * as React from 'react';
import {Text, View, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import styles from '../../components/style';

var width = Dimensions.get("window").width;

const addsubscreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.body1}>
        <View style={styles.slogans}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            We Provide
          </Text>
          <Text style={styles.sidehead}>Easy Tracking</Text>
          <Text style={styles.content}>
            With advanced tracking algorithms, you can now track live location
            of the vehicle taking your little ones to school.
          </Text>
          <Text style={styles.sidehead}>Highly Flexible</Text>
          <Text style={styles.content}>
            Schoolferry is not like ordinary school bus service provided by
            schools, we provide you flexibility in booking and cancellation
            options. You can pause your subscription at anytime and we will
            provide you service for days that you paused subscription for..
          </Text>
          <Text style={styles.sidehead}>Low Cost</Text>
          <Text style={styles.content}>
            In the world of price hikes on everything, we are here with
            exceptionally low price packages, join today for jaw-dropping value
            for money packages.
          </Text>
          <Text style={styles.sidehead}>Highly Safe</Text>
          <Text style={styles.content}>
            With a team of highly experienced drivers and advanced location
            tracking app, schoolferry provide you safety like never before.
            Nannies are also provided to take care of your little ones.
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            marginTop: 20,
            textAlign: 'center',
            marginHorizontal:width * 0.03
          }}>
          To subscribe to a plan , check service availability at your area and
          get started.
        </Text>
        <TouchableOpacity
          style={{...styles.loginBtn,marginTop:10,marginBottom:10}}
          onPress={() => navigation.navigate('location')}>
          <Text style={styles.loginText}>Check availability</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default addsubscreen;
