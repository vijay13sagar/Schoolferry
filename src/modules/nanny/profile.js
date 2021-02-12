import React, {useEffect, useState} from 'react';
import { Text, View, ScrollView,TouchableOpacity,StatusBar,Linking, StyleSheet, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'

const Profile = ({navigation}) => {
  const [data,getData] = useState([])

useEffect( () => { 
  fetch(`${Ngrok.url}/api/profiledetails/nanny/N001`, {
    "method": "GET",
    "headers": {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('response',responseJson);
      getData( responseJson)
      console.log('responsedata',data);
    })
    .catch(err => {
      console.log('error',err);
    });
  }, [])

  return (
    <View style={styles.container}>
        <StatusBar
         barStyle = "light-content" hidden = {false} backgroundColor = "#e91e63" translucent = {true}

      />
      <TouchableOpacity style={styles.edit}>
        <Text style={styles.loginText} onPress={()=> navigation.navigate("Updateprof")}>EDIT</Text>
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.name}>Hello Nanny</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Name</Text>
        <Text style={styles.inputView}>{data.name}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >User Id</Text>
        <Text style={styles.inputView}>{data.id}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Mobile Number</Text>
        <Text style={styles.inputView}>{data.contact}</Text>
      </View>
      <View style={styles.textview}>
        <Text style={styles.headertext} >Address</Text>
        <Text style={styles.inputView} >{data.address}</Text>
      </View>
      
        <Text style={styles.headertext} >Id Proof</Text>
        {/* <Image >{data.idProofUrl}</Image> */}
        <View style={styles.imageview}>
        <Image style={styles.id} source={{ uri: 'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg' }} />
      </View>  
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Passwordchange')}  >
        <Text style={styles.loginText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => { Linking.openURL('tel:8777111223') }}  >
        <Text style={styles.loginText}>Contact Admin</Text>
      </TouchableOpacity>
      
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

  },
  edit:{
    flexDirection:'row-reverse',
    height:35,
    backgroundColor:'#ff5c8d',
    width:70,
    alignSelf:'flex-end',
    marginTop:15,
    marginHorizontal:20,
    alignItems:'center',
    justifyContent:'center',
    //borderColor:'black',
    borderRadius:12,
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    padding:8,
    height: 35,
    alignSelf:'center',
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
  imageview:{
    marginBottom:150,
  },
  id: {
    width: 300,
    height: 160,
    // borderRadius: 63,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    //justifyContent: 'flex-start',
    marginTop: 5
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight:'bold',
    fontWeight: '600',

  },
  body: {
    marginTop: 25,
    alignItems: 'center'

  },
  textview: {
    marginBottom: 7,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 35,
  },
  details: {
    height: 40,
    backgroundColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginTop: 20,
  },
  loginText:{
    color:'black',
    fontSize:15,
   // fontWeight:'700'
  }

});