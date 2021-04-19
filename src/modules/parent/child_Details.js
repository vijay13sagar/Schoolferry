import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from '../../components/style';
import {Card, CardItem, Body} from 'native-base';

export default function Trip_Details({route}) {
  const nannyid = route.params.nannyId;
  console.log(route.params)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.tripDetailsCard}>
        <CardItem>
          <Text style={styles.headingText}>Driver Alloted -</Text>
        </CardItem>
        <CardItem bordered>
          <Body style={{flexDirection: 'row'}}>
            <Image
              style={styles.tripdDetailsImage}
              source={{
                uri:
                  'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg',
              }}
            />
            <View style={styles.detailsBox}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.tripdetailsSubHeading}>Name </Text>
                <Text style={styles.subDetails}>
                  {'    '}
                  {route.params.driverName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.tripdetailsSubHeading}>Driver ID </Text>
                <Text style={styles.subDetails}>{route.params.driverId}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.tripdetailsSubHeading}>Contact</Text>
                <Text style={styles.subDetails}>
                  {'  '}
                  {route.params.driverContact}
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
      {nannyid ? (
        <Card style={{...styles.tripDetailsCard, marginTop: 5}}>
          <CardItem>
            <Text style={styles.headingText}>Nanny Alloted -</Text>
          </CardItem>
          <CardItem bordered>
            <Body style={{flexDirection: 'row'}}>
              <Image
                style={styles.tripdDetailsImage}
                source={{
                  uri:
                    'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg',
                }}
              />
              <View style={styles.detailsBox}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.tripdetailsSubHeading}>Name </Text>
                  <Text style={styles.subDetails}>
                    {'     '}
                    {route.params.nannyName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text style={styles.tripdetailsSubHeading}>Nanny ID </Text>
                  <Text style={styles.subDetails}>{route.params.nannyId}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text style={styles.tripdetailsSubHeading}>Contact</Text>
                  <Text style={styles.subDetails}>
                    {'   '}
                    {route.params.nannyContact}
                  </Text>
                </View>
              </View>
            </Body>
          </CardItem>
        </Card>
      ) : null}

      <Card style={{...styles.tripDetailsCard, marginTop: 5, marginBottom: 20}}>
        <CardItem>
          <Text style={styles.headingText}>Vehicle Alloted -</Text>
        </CardItem>
        <CardItem bordered>
          <Body style={{flexDirection: 'row'}}>
            <Image
              style={styles.tripdDetailsImage}
              source={{
                uri:
                  'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg',
              }}
            />
            <View style={styles.detailsBox}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.tripdetailsSubHeading}>Vehicle ID </Text>
                <Text style={styles.subDetails}>
                  {'         '}
                  {route.params.vehicleId}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.tripdetailsSubHeading}>Vehicle Model </Text>
                <Text style={styles.subDetails}>
                  {'  '}
                  {route.params.vehicleModel}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.tripdetailsSubHeading}>Vehicle Type </Text>
                <Text style={styles.subDetails}>
                  {'    '} {route.params.vehicleType}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={styles.tripdetailsSubHeading}>
                  Registeration No
                </Text>
                <Text style={styles.subDetails}>
                  {route.params.vehicleRegNo}
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </ScrollView>
  );
}
