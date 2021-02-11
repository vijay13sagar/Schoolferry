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
        fetchAddress (lat, lng)

    }

   // console.log('key',process.env.REACT_APP_MAPS_API_KEY)

    return (

        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
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