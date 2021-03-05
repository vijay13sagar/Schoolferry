import React, { Component} from 'react';
import { ActivityIndicator,StatusBar,StyleSheet, FlatList, Text, View, Modal } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';

export default class Notificationlist extends Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      modalVisible:false,
      selectedData:'',
      selectedDate:'',
    };
  }
  componentDidMount=async()=> {
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/notices/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
 setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }  
  _selectedItem = (data,data2) => {
    this.setState({selectedData: data,selectedDate:data2});
    this.setModalVisible(true);
  }
  render() {
    const { data, isLoading } = this.state;
    const { modalVisible } = this.state;
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
    
    return (
      <View style={{ flex: 1, padding: 3 ,backgroundColor: "#F9F2F2",}}>
       
        <ScrollView>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
        <Card>
        <CardItem button onPress={() => {
                  this._selectedItem(item.message,item.date);
                }}>
              <Body>
                <Text>
                     {item.message}
                </Text>
              </Body>
          </CardItem>
          </Card> 
            
            )}
          />
          
        )}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
          <Ionicons name="close-circle-outline"
            color="#fff" size={30}
            style={styles.icon}
            onPress={(modalVisible) => this.setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody}>
            <Text style={styles.modalheading}>Date of Notice: {this.state.selectedDate}</Text>
            <Text style={styles.message}>{this.state.selectedData}</Text>
          </View>
        </View>
        </Modal>
        
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex:1,
    backgroundColor: "#F9F2F2",
      alignItems: "center",
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
      backgroundColor: "#ff5c8d",
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
    loginText:{
      color:'black',
      fontSize:15,
     // fontWeight:'700'
    },
    modalContainer: {
      backgroundColor: '#000000aa',
      flex: 1,
      //height: '50%',
      justifyContent: 'center'
    },
    icon: {
      alignSelf: 'flex-end',
      marginRight: 10
    },
    modalBody: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 280,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'center'
  
    },
    message: {
      fontSize: 22,
      textAlign: 'center',
      color: '#000',
      fontWeight: '600',
      padding: 7,
    },
    modalheading:{
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 10,
      color: '#000',
      fontWeight: '700',
      padding: 7,
    },
  
    closeModal: {
      borderRadius: 10,
      width: 180,
      height: 40,
      marginTop: 40,
      backgroundColor: '#ff5c8d',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
});