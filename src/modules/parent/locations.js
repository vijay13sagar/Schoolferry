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
import Ngrok from '../../constants/ngrok';

const location = ({ navigation }) => {
    const [pincode, setPincode] = useState("00")
    const [origin, setOrigin] = useState({
        latitude: " ",
        longitude: " ",

    })
    const [destination, setDestination] = useState({
        latitude: " ",
        longitude: " ",
    })
    const [travelMode, setTravelMode] = useState(" ")
    const [modalVisible, setModalVisible] = useState(false);
    const [{ error }, setError] = useState(" ")

    const fetchCoords = (lat, lng, name) => {
        console.log(lat, lng, name)
        setDestination({
            latitude: lat,
            longitude: lng,
        })
    }

    const fetchDestinationCoords = (lat, lng, name, address) => {
        console.log(lat, lng, address)
        setDestination({
            latitude: lat,
            longitude: lng,
        })

    }

    const modalButtonHandler = () => {
        setModalVisible(!modalVisible)
        navigation.navigate("Home")
    }

    /*const calculateDistance = () => {
        //const origin1 = (26.230103499877522, 78.16342134574947)
        //const destination1 = (28.69452575953048, 77.18056765444814)
        const service = google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
              origins: [{lat: 26.230103499877522, lng: 78.16342134574947}],
              destinations: [{lat: 28.69452575953048, lng: 77.180567654448147}],
              travelMode: 'DRIVING',
             // transitOptions: TransitOptions,
              //drivingOptions: DrivingOptions,
              unitSystem: UnitSystem,
            }, callback);

            function callback(response, status) {
                if (status === "OK") {
                    console.log(response)

                }

            }
    }*/

    const submitHandler = () => {

        if (!pincode) {
            setError({ error: 'Please enter pincode' })
        }
        else {


            fetch(`${Ngrok.url}/api/locations/${pincode}`, {
                "method": "GET",
                "headers": {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })

                .then((response) => {
                    console.log(response.status);
                    response.json()
                    //console.log('resp',response.status);
                    if (response.status == 200) {
                        navigation.navigate('Subscriptions')

                    } else {
                        setModalVisible(true)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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

            <TouchableOpacity style={styles.submitBtn} onPress={calculateDistance} >
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