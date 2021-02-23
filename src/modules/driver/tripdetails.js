import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checklist = ({navigation}) => {
    const [data, setData] = useState([
        { id: '1', name: 'akash singh' },
        { id: '2', name: 'vidya sagar' },
        { id: '3', name: 'sai kumar' },
        { id: '4', name: 'john green' }
    ])
    const [modalVisible, setModalVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);

    /* useEffect(() => {
         fetch(`https://jsonplaceholder.typicode.com/users`, {
             "method": "GET",
             "headers": {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             }
         })
             .then(response => response.json())
             .then(responseJson => {
                // setData({ data: responseJson[0].name })
                 console.log(responseJson[0].name);
             })
             .catch(err => {
                 console.log(err);
             });
        
         }, []);*/

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <Ionicons name="close-circle-outline"
                        color="#fff" size={30}
                        style={styles.icon}
                        onPress={(modalVisible) => setModalVisible(!modalVisible)}
                    />
                    <View style={styles.modalBody}>

                        <Text style={styles.message}>Child Details</Text>
                        <Text style={styles.newsText}>Name - xxx</Text>
                        <Text style={styles.newsText}>Age - xxx</Text>
                        <Text style={styles.newsText}>Blood Group - xxx</Text>
                        <Text style={styles.newsText}>Parent's Contact - xxx</Text>
                        <Text style={styles.newsText}>Address - xxx</Text>

                        <View style={{ flexDirection: 'row', marginTop:20, alignSelf:'center', }}>
                            <Text style={styles.absent}>Mark as Absent</Text>
                            <Switch
                                value={switchValue}
                                //trackColor={{ true: "red" }}
                                onValueChange={()=> setSwitchValue(!switchValue)}
                                style={{marginLeft:10,}}
                            />

                        </View>

                    </View>
                </View>
            </Modal>


            <View style={styles.firstbox} >
                <Text style={styles.textTitle}>Trip Number - 1</Text>
                <View style={styles.detailsBox}>
                    <Text style={styles.textDetails}>Destination: Srv international School </Text>
                    <Text style={styles.textDetails}>Total Present - 18</Text>
                    <Text style={styles.textDetails}>Children marked Absent - 02</Text>
                </View>
            </View>
            
            <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Trackee',{refresh:true})}>
              <Text>Live location</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />

        </View>
    );
}

export default Checklist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstbox: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 15,
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
        marginBottom:20,
      },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 5
    },
    detailsBox: {
        // backgroundColor:'yellow',
        flex: 1,
        marginTop: 5,
        alignItems: 'center',

    },
    textDetails: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 4,
    },
    card: {
        backgroundColor: '#32cd32',
        borderRadius: 10,
        //borderWidth: 1,
        marginBottom: 15,
        //backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 70,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 10,
            height: 10
        }
    },
    itemText: {
        fontSize: 18,
        fontWeight: '600'

    },
    modalContainer: {
        backgroundColor: '#000000aa',
        flex: 1,
        //height: '50%',
        justifyContent: 'center'
    },
    modalBody: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 370,
        width: '92%',
        alignSelf: 'center',
        //justifyContent: 'center'

    },
    message: {
        fontSize: 27,
        textAlign: 'center',
        marginTop: 15,
        color: '#000',
        fontWeight: '600'
    },
    newsText: {
        fontSize: 23,
        padding: 2,
        color: '#000000aa',
        padding: 5,
        marginLeft: 10,
        fontWeight: '600'
    },

    closeModal: {
        borderRadius: 10,
        width: "50%",
        height: 40,
        marginTop: 40,
        backgroundColor: '#ff5c8d',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 5
    },
    absent:{
        marginLeft:10,
        fontSize:23,
        //marginTop:10,
        color:'red',
    }

})