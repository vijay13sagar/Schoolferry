import React, {useState} from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import API_KEY from '../../config';

const address_pickup = ({
    placeholderText,
    fetchAddress
    }) => {

    const onSubmit = (data, details) =>{
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        const name = data.structured_formatting.main_text
        const address = data.description
        const schooladdress = data.description
        //fetchAddress (lat, lng, address)
        fetchAddress (lat, lng, name, address,schooladdress)
    }

    return (

        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                minLength={2}
                fetchDetails={true}
                onPress= {onSubmit}
               // onPress={(data, details) => {
                     //'details' is provided when fetchDetails = true
                   // console.log( data, details);
                   // console.log(details.geometry.location.lat);
               // }}
                query={{
                    key: API_KEY.key,
                    language: 'en',
                    location: "12.943140750715235, 77.6157813963218",
                    radius: "150",
                }}
                style={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle
                }}
            />
        </View>
    );
}

export default address_pickup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: '#fff',
    },
    textInputStyle: {
        height: 50,
        color: '#000',
        fontSize: 16,
        backgroundColor: '#F3F3F3'


    }

})