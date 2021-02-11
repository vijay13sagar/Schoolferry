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

    const fetchCoords = (lat, lng) => {
        console.log(lat, lng)
        setDestination({
            latitude: lat,
            longitude: lng,
        })
    }

    const fetchDestinationCoords = (lat, lng) => {
        console.log(lat, lng)
        setDestination({
            latitude: lat,
            longitude: lng,
        })

    }

    const submitHandler = () => {

        fetch(`https://963e976ffdf5.ngrok.io/api/locations/${pincode}`, {
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
                    <View style={styles.modalBody}>

                        <Text style={styles.message}>Service unavailable</Text>
                        <Text style={styles.newsText}>Your request has been accepted, we will get back to you SOON</Text>

                        <TouchableOpacity style={styles.closeModal} onPress={(modalVisible) => setModalVisible(!modalVisible)}>
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
        height: '50%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        //marginTop: 30
    },
    newsText: {
        fontSize: 26,
        textAlign: 'center',
        marginTop: 15,
        padding: 2,
        color: '#4169e1',
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
    }
})