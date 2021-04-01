import React, { Component } from 'react';
import { ActivityIndicator, Modal ,TouchableOpacity,StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class freeVehicletrip_list extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      //modalVisible:false,
      //selectedData:'',
    };
  }
 
  componentDidMount() {
   ;
    
    fetch(`${Ngrok.url}/api/admin/trip/available/vehicles`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
       
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  // setModalVisible = (visible) => {
  //   this.setState({ modalVisible: visible });
  // }
  // _selectedItem = (data) => {
  //   this.setState({selectedData: data});
  //   this.setModalVisible(true);
  // }

  render() {
    const { data, isLoading } = this.state;
    const { modalVisible } = this.state;
    const tripid1 = this.props.route.params.s;
  console.log("sfsdffasdas", tripid1);
    
    return (
      <View style={styles.Container}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View >  
        <Card >
        <CardItem button onPress = {()=>this.props.navigation.navigate('Edit_Vehicle',{tripid1:tripid1,item:item})}>
              <Body>
                <Text>
                Vehicle Number:-{item.regNo}
                </Text>
                
              </Body>
            </CardItem>
            </Card>
           
             
           </View>
            )}
          />
        )}
        {/* <Modal
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
            <Text style={styles.message}>Name:-{this.state.selectedData.childName}</Text>
            <Text style={styles.message}>Age:-{this.state.selectedData.age}</Text>
            <Text style={styles.message}>School:-{this.state.selectedData.school}</Text>
            <Text style={styles.message}>Home:-{this.state.selectedData.address}</Text>
            <Text style={styles.message}>Phone NO:-{this.state.selectedData.parentsContact}</Text>
            <Text style={styles.message}>Blood Group:-{this.state.selectedData.bloodGroup}</Text>
          </View>
        </View>
        </Modal> */}
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
      width: "35%",
      borderRadius: 10,
      height: 40,
     alignSelf:"flex-end",
      backgroundColor: "#ff5c8d",
    },
      loginBtns: {
        width: "35%",
        borderRadius: 10,
        height: 40,
       alignSelf:"flex-end",
        
        backgroundColor: "#ff5c8d",
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
      //marginTop: 30
      color: '#000',
      fontWeight: '600',
      padding: 7,
    },
    closeModal: {
      borderRadius: 10,
      width: 180,
      height: 40,
      marginTop: 40,
      backgroundColor: '#FF5C8D',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
});