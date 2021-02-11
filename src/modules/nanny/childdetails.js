import * as React from 'react';
import { Text, View, TouchableOpacity, StatusBar,StyleSheet, Image } from 'react-native';

const nannyhome = () =>  {
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
            <Text style={styles.headertext} >Child details</Text>
            <View style={styles.details2}>
              <Text style={styles.inputView}>child name</Text>
              <Text style={styles.inputView}>child age</Text>
              <Text style={styles.inputView}>child school</Text>
              <Text style={styles.inputView}>child bloodgroup</Text>
              <Text style={styles.inputView}>Parent Contact Number</Text>
            </View>
          </View>
      </View>
    );
  }

export default nannyhome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",

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
  details: {
    height: 40,
    margin:10,
    backgroundColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#4DAFCE',
    //marginTop: 3,
    width: '85%',
    padding: 8,
    alignSelf: "center"
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
