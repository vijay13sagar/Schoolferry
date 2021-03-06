import React, { useState } from 'react';
import { Text, View, ScrollView, StatusBar, Image } from 'react-native';
import styles from '../../components/style';


const nannyhome = ({ route }) => {
  const [defimg, setDef] = useState('https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png');
  return (
    <ScrollView style={styles.container} >
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      <Image style={styles.licence1} source={route.params.item.photoUrl == "NULL" || route.params.item.photoUrl == null ? { uri: (defimg) } : { uri: (route.params.item.photoUrl) }} />
      <Text style={styles.headertext}>child name:</Text>
      <Text style={styles.details}>{route.params.item.childName}</Text>

      <Text style={styles.headertext}>child ID:</Text>
      <Text style={styles.details}>{route.params.item.childId}</Text>

      <Text style={styles.headertext}>child age:</Text>
      <Text style={styles.details}>{route.params.item.age}</Text>

      <Text style={styles.headertext}>child school:</Text>
      <Text style={styles.details}>{route.params.item.school}</Text>

      <Text style={styles.headertext}>child bloodgroup:</Text>
      <Text style={styles.details}>{route.params.item.bloodGroup}</Text>

      <Text style={styles.headertext}>Parent Contact Number:</Text>
      <Text style={styles.details}>{route.params.item.parentsContact}</Text>

      <Text style={styles.headertext}>Child Address:</Text>
      <Text style={styles.details}>{route.params.item.address}</Text>
    </ScrollView>
  );
}

export default nannyhome;
