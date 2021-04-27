import React,{useState} from 'react';
import { Text, View, StatusBar, TouchableOpacity,FlatList,  Image } from 'react-native';
import styles from '../../components/style';
import { Card, CardItem, Body } from 'native-base'

export default function trip_Details({ route, navigation }) {
  const [defimg, setDef] = useState('https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png');
  return (
    <View style={styles.container} >
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
        <Text style={styles.headertext}>Location:</Text>
        <Text style={styles.details}>{route.params.item.location}</Text>
        <Text style={styles.headertext}>Driver ID:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverId}</Text>
        <Text style={styles.headertext}>Driver Name:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverName}</Text>
        <Text style={styles.headertext}>Driver No:</Text>
        <Text style={styles.details}>{route.params.item.driverInfo.driverContact}</Text>
        <Text style={styles.headertext}>Vehicle No:</Text>
        <Text style={styles.details}>{route.params.item.vehicle}</Text>
      <Text style={styles.sidehead} >List of Children:</Text>
          <FlatList
            data={route.params.item.childList}
            keyExtractor={(item) => item.childId}
            renderItem={({ item }) => (
              <Card style={styles.nannychild}>
                <CardItem button onPress={()=>navigation.navigate('oldChild Details',{item:item})}>
                  <Body style={{ flexDirection: 'row' }}>
                  <Image style={styles.payicon} source={item.photoUrl == "NULL" || item.photoUrl == null ? { uri: (defimg) }:{ uri: (item.photoUrl) }}/>
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





