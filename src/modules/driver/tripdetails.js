import React, { useState, useEffect } from 'react';
import {
    RefreshControl,
    SafeAreaView,
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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Checklist = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [but, setBut] = useState('Start Trip')
    const [locdisable, setLoc] = useState();
    const [details, setDet] = useState([]);
    const [item1, setItem1] = useState([]);
    const [absentee,setInfo] =useState();
    let TripID = route.params.item.trip_id;
    let VehicleID = route.params.item.vehilce;
    const [refreshing, setRefreshing] = React.useState(false);
    //const [len, setLen] = useState(0);

    const onRefresh = React.useCallback(() => {
        // setLen(route.params.item.destination.length)
        // console.log("lenght", len);
        setRefreshing(true);
        Children();
        wait(2000).then(() => setRefreshing(false));
        
    }, []);

    const Children = () => {
        fetch(`${Ngrok.url}/api/driver/trip/${TripID}`, {
            "method": "GET",
            "headers": {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                setInfo(responseJson.noOfChildrenAbsent)
                setLoc(responseJson.startedTripAt);
                setDet(responseJson.childList)
            })
            .catch(err => {
                console.log('error', err);
            });
    }
    useEffect(() => {
        Children();
    }, [])


    const SetSwitchValue = (id, value) => {

        try {
            axios({
                method: 'POST',
                url: `${Ngrok.url}/api/driver/attendance`,
                "headers": {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    childid: id,//item1.childId
                    tripid: TripID,//route.params.item.trip_id
                    attendance: value
                }
            })
                .then(function (response) {
                    if (response.data.message == "attendance marked") {
                        onRefresh();
                    }
                })
        }
        catch (error) {
            console.log("errordetails", error);
        }
    }

    const starting = async () => {
        setBut("Trip Inprogress");
        //setLoc(false);
        
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
                       // Alert.alert("Trip started")
                       onRefresh();
                    }
                    console.log("response for starttrip", response.status);
                })
        }
        catch (error) {
            console.log("errordetails", error);
        }
    }
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
                    </View>
                </View>
            </Modal>

            <ScrollView ontentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text style={styles.textHeads}>Total Absent - </Text>
                        <Text style={styles.textDetails}> {absentee}</Text>
                        </View>
                        
                        {route.params.item.nannyInfo.nannyId ? <Nannyprofile /> : null}
                    </View>
                </View>
                <TouchableOpacity style={!locdisable ? styles.loginBtn : styles.disableBtn} disabled={locdisable} onPress={() => {
                    starting()
                }}>
                    <Text>{but}</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!locdisable} style={!locdisable ? styles.disableBtn : styles.loginBtn} onPress={() =>
                    navigation.navigate('Map', { screen: 'Trackee', params: { tripid: route.params.item.trip_id } },
                    )
                }>
                    <Text>Live location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Check_list', { TripID: TripID, VehicleID: VehicleID })}>
                    <Text>Check List</Text>
                </TouchableOpacity>
                <Text style={styles.absent}>Marked Absent</Text>
                <SafeAreaView>
                <FlatList
                    data={details} //item2
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', }}>
                            <TouchableOpacity style={styles.card} onPress={() => {
                                setModalVisible(!modalVisible)
                                setItem1(item)
                            }}>
                                <Text style={styles.itemText}>{item.childName}{/*item.childId*/}</Text>
                            </TouchableOpacity>
                            <Switch
                                value={item.attendance}
                                onValueChange={(value) => { SetSwitchValue(item.childId, value) }}
                                style={{ marginLeft: 10, }}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
                </SafeAreaView>
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
    disableBtn: {
        width: "50%",
        borderRadius: 10,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgrey",
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
        //marginHorizontal:19,
        alignItems: 'flex-start',

    },
    textDetails: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 4,
    },
    textHeads: {
        fontSize: 18,
        fontWeight: 'bold',
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