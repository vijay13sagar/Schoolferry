import React,{ useState, useEffect } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Addsubscription from './addsubscription';
import Showplans from './showplans';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const subscription = ({navigation}) =>  {

  const [childinfo,setChildInfo] = useState()
  const [childid, setchildID] = useState()

  useEffect( () => {
    async function fetchData () {
      let token = await AsyncStorage.getItem('token')
      let response = await axios(`${Ngrok.url}/api/parent/registeration/${token}`)
       
      //console.log(response.data.childId)
       let data = response.data.payment
       let id = response.data.childId
       if (data == "registered"){
         setChildInfo(true);
         setchildID(id)
        
       }
       else{
        setChildInfo(false);
       }
     
    }
    
    fetchData();
  },[])
 
 /*const getchildID = (id) =>{
   setchildID(id)
 }*/
console.log('childid in home',childid)
    return (
      <View style={styles.container} >
        {childinfo && childid ? < Showplans childid={childid} navigation = {navigation} /> : <Addsubscription navigation = {navigation} /> }
            
      
      </View>
    );
  }

export default subscription;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
 
});
