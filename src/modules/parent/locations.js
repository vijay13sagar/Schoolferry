import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AddressPickup from '../../components/addresspickup'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Ngrok from '../../constants/ngrok';
import { getDistance, getPreciseDistance } from 'geolib';


const location = ({ navigation }) => {
    const [pincode, setPincode] = useState("")
    const [origin, setOrigin] = useState({
        latitude1: "0 ",
        longitude1: "0 ",

    })
    const [destination, setDestination] = useState({
        latitude2: "0",
        longitude2: "0 ",
    })
    const [Distance, setDistance] = useState( )
    const [schoolAddress, setSchoolAddress] = useState(" ")
    const [residenceAddress, setResidenceAddress] = useState(" ")
    const [modalVisible, setModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [{ error }, setError] = useState(" ")

    const fetchCoords = (lat, lng, name, address, schooladdress) => {
        console.log(lat, lng)
        setOrigin({
            latitude1: lat,
            longitude1: lng,
        })
        setSchoolAddress(schooladdress)
    }

    const fetchDestinationCoords = (lat, lng, name, address, schooladdress) => {
        console.log(lat, lng)
        setDestination({
            latitude2: lat,
            longitude2: lng,
        })
        setResidenceAddress(schooladdress)

    }

    const modalButtonHandler = () => {
        setModalVisible(!modalVisible)
        navigation.navigate("Home")
    }
    const modal1ButtonHandler = async () =>  {
        setModal1Visible(!modal1Visible);
        const dis = await calculateDistance();
        navigation.navigate('Subscriptions', {
            screen: 'Add Child',
            params: { 
                    distance: dis,
                    schooladdress:schoolAddress,
                    homeaddress: residenceAddress,
                 },
          })
    }

    const calculateDistance = () => {
        var dis = getDistance(
            { latitude: origin.latitude1, longitude: origin.longitude1 },
            { latitude: destination.latitude2, longitude: destination.longitude2 }
        );
        // alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
        let finalDistance = dis / 1000
        setDistance(finalDistance)
        return finalDistance;
    };

    const submitHandler = async () => {
       //const dis = await calculateDistance();
        //console.log("distance", dis)

        if (!pincode) {
            setError({ error: 'Please enter pincode' })
        }
       /* else {
            navigation.navigate('Subscriptions', {
                screen: 'Add Child',
                params: {
                    distance: dis,
                    schooladdress: schoolAddress,
                    homeaddress: residenceAddress,
                },
            })
        }*/
        else {

            const responsePincode = await fetch(`http://schoolferry.eba-syr2z5av.us-east-2.elasticbeanstalk.com/api/locations/pincode/${pincode}`);
            console.log (responsePincode.status)
            const responseSchool = await fetch(`http://schoolferry.eba-syr2z5av.us-east-2.elasticbeanstalk.com/api/locations/schools/${schoolAddress}`);
            console.log (responseSchool.status)   
    
                    if (responsePincode.status == 200 && responseSchool.status ==200){
                        setModal1Visible(true);
                        // navigation.navigate('Subscriptions', {
                        //     screen: 'Add Child',
                        //     params: { 
                        //             distance: dis,
                        //             schooladdress:schoolAddress,
                        //             homeaddress: residenceAddress,
                        //          },
                        //   })
                          
                    } else {
                        setModalVisible(true)
                    }
           
        }

    }

    return (
        <ScrollView style={styles.scrollview}
            keyboardShouldPersistTaps="handled"
        >
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

                        <Text style={styles.message}>Sorry, Currently Unavailable</Text>
                        <Text style={styles.newsText}>We will get back to you once we start service at your area</Text>

                        <TouchableOpacity style={styles.closeModal} onPress={modalButtonHandler}>
                            <Text style={{ fontSize: 17, }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal1Visible}
            >
                <View style={styles.modalContainer}>
                    <Ionicons name="close-circle-outline"
                        color="#fff" size={30}
                        style={styles.icon}
                        onPress={(modal1Visible) => setModal1Visible(!modal1Visible)}
                    />
                    <View style={styles.modalBody}>

                        <Text style={styles.message}>Great! Service is available</Text>
                        <Text style={styles.newsText}>To Avail Service ,kindly add child  details</Text>

                        <TouchableOpacity style={styles.closeModal} onPress={modal1ButtonHandler}>
                            <Text style={{ fontSize: 17, }}>Add Child</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <AddressPickup
                placeholderText=" Enter School Name"
                fetchAddress={fetchCoords}

            />
            <View style={{ marginBottom: 16 }} />
            <AddressPickup
                placeholderText=" Enter Residence Address"
                fetchAddress={fetchDestinationCoords}
            />
            <TextInput
                keyboardType="numeric"
                style={styles.TextInput}
                placeholder="Enter Pincode"
                placeholderTextColor="#929292"
                onChangeText={(pincode) => setPincode(pincode)}

            />
            <Text style={styles.error}>{error}</Text>

            <TouchableOpacity style={styles.submitBtn} onPress={submitHandler} >
                <Text style={styles.TextBtn}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}


export default location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        backgroundColor: '#F9F2F2',
        flex: 1,
        padding: 24,
    },
    TextInput: {
        marginTop: 13,
        paddingLeft: 14,
        height: 47,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 15,
    },
    error: {
        color: '#DC143C',
        fontSize: 13,
        alignSelf: 'center',
        marginTop: 5
    },
    submitBtn: {
        width: "65%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#ff5c8d",
        marginVertical: 20
    },
    TextBtn: {
        fontSize: 15,
    },
    modalContainer: {
        backgroundColor: '#000000aa',
        flex: 1,
        height: '50%',
        justifyContent: 'center'
    },
    modalBody: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 280,
        width: '88%',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    message: {
        fontSize: 26,
        textAlign: 'center',
        //marginTop: 30
        color: '#DC143C',
        fontWeight: '600'
    },
    newsText: {
        fontSize: 19,
        textAlign: 'center',
        marginTop: 15,
        padding: 2,
        color: 'green',
    },

    closeModal: {
        borderRadius: 10,
        width: "50%",
        height: 40,
        marginTop: 30,
        backgroundColor: '#ff5c8d',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 10
    }
})