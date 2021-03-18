import React, { Component } from 'react';
import { ActivityIndicator,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
export default class ChildList extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  // componentDidMount() {
  //   fetch(`${Ngrok.url}/api/nanny/tripdetails/N002`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({ data: json });
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => {
  //       this.setState({ isLoading: false });
  //     });
  // }
  render() {
    const { data, isLoading } = this.state;
    console.log("json",this.props.route.params.childList[0].childId);
    return (
      <View style={styles.container}>
        
            <Text style={styles.sidehead} >Child details:</Text>
          <FlatList
            data={this.props.route.params.childList}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
        <TouchableOpacity style={styles.loginBtn} onPress = {()=>this.props.navigation.navigate('Child Details',{item:item})}>
          <Text>{item.childName} , { item.childId }</Text>
        </TouchableOpacity>
            )}
          />
      </View>
     
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
      backgroundColor: "#F9F2F2",
      //alignItems: "center",
    },
    TextInput: {
      height: 50,
      alignItems:"center",
      justifyContent:"center",
      padding: 10,
      marginLeft:10,
    },
    loginBtn: {
      width: "50%",
      borderRadius: 10,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FF5C8D",
      alignSelf: "center",
      marginTop: 20,
    },
      title:{
        position:'absolute',
        marginTop:65,
        marginBottom:0,
        marginHorizontal:20,
        fontSize: 30,
        color:'white',
        fontWeight:'bold'
    }, time:{
        width:'20%',
        marginVertical: 20,
        position:'absolute',
        backgroundColor:'green',
        color:'white',
        fontSize: 25,
        fontWeight:'bold',
        bottom:0,
        borderRadius:20,
        marginLeft: 20
    },
    textview: {
      margin: 20,
    },
    sidehead:{
      fontWeight:'bold',
      marginLeft:8,
      alignSelf:'flex-start',
      justifyContent:'space-around'
    },
});





