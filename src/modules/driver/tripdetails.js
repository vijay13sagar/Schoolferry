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
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';

const Checklist = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [att,setAtt] = useState("");
    const [nannyID, setNannyid] = useState(route.params.item.nannyInfo.nannyId);
    const [but, setBut] = useState('Start Trip')
    const [details, setDet] = useState([]);
    const [item1, setItem1] = useState([]);
    const [childId, setChildId] = useState("");
    const [item2, setItem2] = useState(route.params.item.childList);
    const [selectedValue, setValue] = useState("");
    let TripID=route.params.item.trip_id;
    let VehicleID=route.params.item.vehilce;
    // useEffect( () => {
    //     const fetchData = navigation.addListener('focus', async () => {
    //         console.log('hahah', route.params.item.trip_id);
    //         let Trip = route.params.item.trip_id;
    //     fetch(`${Ngrok.url}/api/driver/tripdetails/${TripID}`, {
    //       "method": "GET",
    //       "headers": {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //     })
    //       .then(response => response.json())
    //       .then(responseJson => {
    //         console.log('responsehshshs',responseJson);
    //         setDet( responseJson)
    //         console.log('details',details);
    //         console.log('details',details.location);
    //       })
    //       .catch(err => {
    //         console.log('error',err);
    //       });
    //     })
    //     fetchData
    //     }, [navigation])
    const Allinone=(value)=>{
        setValue(value);
        console.log("hihiih", item2);
        SetSwitchValue(value);
        console.log('pickervalue', selectedValue)
    }
    const SetSwitchValue = (value) => {
        // const data1 = item2.map(child => {
        //     if (child.childId === item.childId) {
        //         return { ...child, attend: !child.attend }
        //     }
        //     return child
        // })
        // //console.log("item1",k);
        // console.log("why",data1);
        // setItem2(data1)
        try {
            //console.log("working", selectedValue)
            axios({
                method: 'POST',
                url: `${Ngrok.url}/api/driver/attendance`,
                "headers": {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    childid: value,//item1.childId
                    tripid: TripID,//route.params.item.trip_id
                    attendance: true
                }
            })
                .then(function (response) {
                    if (response.data.message == "attendance marked") {
                        Alert.alert("Attendance")
                        setAtt(response.data.totalMarkedAbsent);
                        console.log("att",att);
                    }
                    console.log("ssss", response.data.totalMarkedAbsent);
                    console.log("attendess",att);
                    console.log("response", response.status);
                })
        }
        catch (error) {
            console.log("errordetails", error);
        }
    }

    const starting = async () => {
        setBut("Trip Inprogress");
        try {
            axios({
                method: 'POST',
                url: `${Ngrok.url}/api/driver/trip/start`,
                "headers": {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    tripid: route.params.item.trip_id,
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        Alert.alert("Trip started")
                    }
                    console.log("response for starttrip", response.status);
                })
        }
        catch (error) {
            console.log("errordetails", error);
        }
    }
    const myUsers = () => {
        //console.log("item2",item2[0].childId);
        return item2 && item2.map((myValue) => {
            return (
                <Picker.Item label={myValue.childName}
                    value={myValue.childId} key={myValue.childId} />
            )
        });
    }
    const Nannyprofile = () => {
        return (
            <View style={styles.detailsBox}>
                <Text style={styles.textDetails}>Nanny Id - {route.params.item.nannyInfo.nannyId}</Text>
                <Text style={styles.textDetails}>Nanny Name - {route.params.item.nannyInfo.nannyName} </Text>
                <Text style={styles.textDetails}>Nanny Contact - {route.params.item.nannyInfo.nannyContact}</Text>
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
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={nannyID ? styles.firstbox : styles.secondbox} >
                    <Text style={styles.textTitle}>Trip ID - {route.params.item.trip_id}</Text>
                    <View style={styles.detailsBox}>
                        <Text style={styles.textDetails}>Destination: {route.params.item.destination} </Text>
                        <Text style={styles.textDetails}>Start Location: {route.params.item.location}</Text>
                        <Text style={styles.textDetails}>Vehicle ID: {route.params.item.vehilce}</Text>
                        <Text style={styles.textDetails}>Total Children: {route.params.item.noOfChildren}</Text>
                        {/* <Text style={styles.textDetails}>Total Absent - {att}</Text> */}
                        {route.params.item.nannyInfo.nannyId ? <Nannyprofile /> : null}
                    </View>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    starting()
                }}>
                    <Text>{but}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Trackee', { refresh: true, tripid: route.params.item.trip_id })}>
                    <Text>Live location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Check_list',{TripID:TripID,VehicleID:VehicleID})}>
                    <Text>Check List</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'column'}}>
                    <Text style={{marginLeft:15,alignSelf:'center',fontSize:18}}>Select Child to Mark Absent</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.Picker}
                    onValueChange={(value) => {Allinone(value)}}
                    //onValueChange={(value) => { setValue(value), console.log("hihiih", item2), SetSwitchValue(value), console.log('pickervalue', selectedValue) }}
                >
                    {myUsers()}
                </Picker>
                </View>
                <Text style={styles.absent}>Marked Absent</Text>
                <FlatList
                    data={item2} //item2
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', }}>
                            <TouchableOpacity style={styles.card} onPress={() => {
                                setModalVisible(!modalVisible)
                                setItem1(item)
                            }}>
                                <Text style={styles.itemText}>{item.childName},{item.childId}</Text>
                            </TouchableOpacity>
                            <Switch
                                value={item.attendance}
                                //onValueChange={(value) => {console.log("navv",value) ,setK(item.childId),setSwitchValue(item,value)}}
                                // onValueChange={(value)=>{console.log("value",value)
                                // setChildId(item.childId)
                                // setSwitchValue(value)}}
                                //onPress={()=>{setChildId(item.childId)}}
                                //onValueChange={(value) => { setChildId(item.childId), console.log("child", childId), setSwitchValue(!item.attendance), console.log("value", value) }}
                                style={{ marginLeft: 10, }}
                            />
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
    },
    firstbox: {
        width: '90%',
        height: 280,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 15,
    },
    secondbox: {
        width: '95%',
        height: 175,
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
        marginVertical: 10,
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
    Picker: {
        width: "40%",
        marginVertical: 0,
        borderRadius: 10,
        height: 30,
        borderWidth: 1,
        alignContent: "center",
        alignSelf: "center",
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
    },
}
)