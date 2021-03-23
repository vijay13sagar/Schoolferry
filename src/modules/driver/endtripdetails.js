import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView, Alert,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';

const Checklist = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    //const [att,setAtt] = useState("");
    const [nannyID, setNannyid] = useState(route.params.item.nannyInfo.nannyId);
    const [but, setBut] = useState('Start Trip')
    //let [details,setDet]= useState("");
    const v = route.params.item.trip_id;
    const [item1, setItem1] = useState([]);
    //let [childId,setChildId]= useState(item1.childId);
    const [childId, setChildId] = useState(item1.childId);
    const [item2, setItem2] = useState(route.params.item.childList);

    const Nannyprofile = () => {
        return (
            <View style={styles.detailsBox}>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={styles.textHeads}>Nanny Id - </Text>
                <Text style={styles.textDetails}> {route.params.item.nannyInfo.nannyId}</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={styles.textHeads}>Nanny Name - </Text>
                <Text style={styles.textDetails}> {route.params.item.nannyInfo.nannyName}</Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={styles.textHeads}>Nanny Contact - </Text>
                <Text style={styles.textDetails}> {route.params.item.nannyInfo.nannyContact}</Text>
                </View>
            </View>
        );
    }
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
                        <Text style={styles.newsText}>Name - {item1.childName} </Text>
                        <Text style={styles.newsText}>Age - {item1.age}</Text>
                        <Text style={styles.newsText}>Blood Group - {item1.bloodGroup}</Text>
                        <Text style={styles.newsText}>Parent's Contact - {item1.parentsContact}</Text>
                        <Text style={styles.newsText}>Address - {item1.address}</Text>
                        <Text style={styles.newsText}>School - {item1.school}</Text>
                        <Text style={styles.newsText}>Attendance - {item1.attendance ? <Text>Absent</Text> : <Text>Present</Text>}</Text>
                    </View>
                </View>
            </Modal>

            <ScrollView>
            <View style={styles.firstbox} >
                    <Text style={styles.textTitle}>Trip ID - {route.params.item.trip_id}</Text>
                    <View style={styles.detailsBox}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Destination: </Text>
                        <Text style={styles.textDetails}> {route.params.item.destination} </Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Start Location:</Text>
                        <Text style={styles.textDetails}>{route.params.item.location}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Vehicle ID: </Text>
                        <Text style={styles.textDetails}> {route.params.item.vehilce}</Text>
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Total Children: </Text>
                        <Text style={styles.textDetails}> {route.params.item.noOfChildren}</Text>
                        </View>
                        {/* <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Total Absent - </Text>
                        <Text style={styles.textDetails}> {att}</Text>
                        </View> */}
                        
                        {route.params.item.nannyInfo.nannyId ? <Nannyprofile /> : null}
                    </View>
                </View>
                <FlatList
                    data={item2}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', }}>
                            <TouchableOpacity style={styles.card} onPress={() => {
                                setModalVisible(!modalVisible)
                                setItem1(item)
                            }}>
                                <Text style={styles.itemText}>{item.childName},{item.childId}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );
}

export default Checklist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F2F2",
    },
    firstbox: {
        width: '90%',
        borderRadius: 10,
        padding: 8,
        borderWidth: 2,
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
        marginVertical: 10,
    },
    textHeads: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 5
    },
    detailsBox: {
        flex: 1,
        marginTop: 5,
        alignItems: 'flex-start',

    },
    textDetails: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 2,
    },
    card: {
        backgroundColor: '#32cd32',
        borderRadius: 10,
        //borderWidth: 1,
        marginBottom: 5,
        marginRight: 15,
        //backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
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
        marginRight: 5,

    },
    absent: {
        alignSelf: 'flex-end',
        fontSize: 15,
        //marginTop:10,
        color: 'red',
    }

})