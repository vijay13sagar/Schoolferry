import * as React from 'react';
import { Text, View, TouchableOpacity, StatusBar,StyleSheet, Image } from 'react-native';

const nannyhome = ({ route }) =>  {
    return (
      <View style={styles.container} >
        <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      /> 
      <View style={styles.textview}>
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
            </View>
         
    );
  }

export default nannyhome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    justifyContent:'center'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "black",
    //marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
    marginTop: 50
  },id: {
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
  showcase:{
    padding:10,
    marginLeft:20,
    flexDirection:'row',
    
  },
  sidehead:{
    fontWeight:'bold',
    marginLeft:8,
    alignSelf:'flex-start',
    justifyContent:'space-around'
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    padding:10,
    width: "80%",
    height: 45,
    alignItems: "center",
    alignSelf:'center',
    backgroundColor:"#fff",   //"#C4C4C4",
    margin: 8,
    //opacity: 0.5,
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: '600',

  },
  body: {
    marginTop: 180,
    alignItems: 'center'

  },
  textview: {
    margin: 20,
  },
  headertext: {
    fontSize: 13,
    marginLeft: 30,
  },
  details:{
    //height: 40,
    backgroundColor: "#d3d3d3",
    borderRadius: 12,
    width: '85%',
    padding: 8,
    alignSelf: "center",
    flexWrap:'wrap'

  },
  details2: {
    height: 340,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#b0003a',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
  },
  details3: {
    height: 150,
    backgroundColor: "grey",
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
