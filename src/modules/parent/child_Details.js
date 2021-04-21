import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from '../../components/style';
import {Card, CardItem, Body} from 'native-base';

export default function Trip_Details({route}) {
  const nannyid = route.params.nannyId;
  const driverPhoto = route.params.driverPhotoUrl;
  const NannyPhoto = route.params.nannyphotoUrl;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.tripDetailsCard}>
        <CardItem>
          <Text style={styles.headingText}>Driver Alloted -</Text>
        </CardItem>
        <CardItem bordered>
          <Body style={{flexDirection: 'row'}}>
            {driverPhoto && driverPhoto !== 'NULL' ? (
              <Image
                style={styles.tripdDetailsImage}
                source={{
                  uri: route.params.driverPhotoUrl,
                }}
              />
            ) : (
              <Image
                style={styles.tripdDetailsImage}
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0E1095uZGr8SfFNizuXsMxB3S9iNuisOtw&usqp=CAU',
                }}
              />
            )}
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
            {NannyPhoto && NannyPhoto !== 'NULL' ? (
              <Image
                style={styles.tripdDetailsImage}
                source={{
                  uri: route.params.nannyphotoUrl,
                }}
              />
            ) : (
              <Image
                style={styles.tripdDetailsImage}
                source={{
                  uri:
                    'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-512.png',
                }}
              />
            )}
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
                  'https://assets.classy.org/7540108/fda4573e-f7ea-11e8-b8cd-0e0b3a1f72a8.png',
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
