import * as React from 'react';
import { Text, View, TouchableOpacity, StatusBar,StyleSheet, Image } from 'react-native';
import styles from '../../components/style';

const nannyhome = ({ route }) =>  {
    return (
      <View style={styles.cont} >
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#FF5C00"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      /> 
            {/* <Text style={styles.sidehead} >Child details:</Text> */}
            
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
                
                {/* <Text style={styles.headertext}>Child photo:</Text>
               
              <View style={styles.imageview}>
                 <Image style={styles.id} source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />
              </View>  */}
            </View>
         
    );
  }

export default nannyhome;
