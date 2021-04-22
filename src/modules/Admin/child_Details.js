import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { event } from "react-native-reanimated";
import styles from '../../components/styles_admin'

export default function child_Details({ route, navigation }){
 

  const [userrimg, setuserImg] = useState(route.params.item.photoUrl);
  const [dimg, setdImg] = useState('https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png');
 
  
  return (
    
    <ScrollView>
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <Image style={styles.licence1} source={userrimg ? {uri:userrimg} : {uri:dimg}} />
        
       <View style={{marginTop:10,marginBottom:10,alignSelf: "center",}}>
       
        
       <Text style={{ fontSize: 22,
       color: "black",
       fontWeight: '700',
       
   }}>
         {route.params.item.childName}
         </Text>
     </View> 
      <View style={{width:"70%",marginRight:50}}>
        <Text>school</Text></View> 
      
      <View style={styles.details}>
        <Text>
          
        {route.params.item.school}
          
        </Text>
      </View>
     
      <View style={{width:"70%",marginRight:50}}>
        <Text>Age</Text></View> 
        <View style={styles.details}>
        <Text>
          
        {route.params.item.age}
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Blood Group</Text></View> 
     
        <View style={styles.details}>
        <Text>
          
        {route.params.item.bloodGroup}
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Pickup Location</Text></View> 
        <View style={styles.details}>
        <Text>
          
        {route.params.item.address} 
          
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Drop Location</Text></View> 
        <View style={styles.details}>
        <Text>
        {route.params.item.school}  
         
        </Text>
      </View>
      <View style={{width:"70%",marginRight:50}}>
        <Text>Subscription Details</Text></View> 
      <View style={styles.details}>
      <Text  style={styles.subText}>Start Date:- {route.params.item.subscription.startDate} </Text>
      <Text  style={styles.subText}>End Date:- {route.params.item.subscription.endDate} </Text>
      <Text  style={styles.subText}>Tenure:- {route.params.item.subscription.tenure} </Text>
      <Text  style={styles.subText}>Cost:- {route.params.item.subscription.cost} </Text>
     
      </View>
     
    </View>
    </ScrollView>

  );

}
