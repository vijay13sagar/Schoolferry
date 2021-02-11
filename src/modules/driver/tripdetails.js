import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';

const Checklist = () => {
    const [data, setData] = useState([
        { id: '1', name: 'akash singh' },
        { id: '2', name: 'vidya sagar' },
        { id: '3', name: 'sai kumar' },
        { id: '4', name: 'john green' }
    ])

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

            <View style={styles.firstbox} >
                <Text style={styles.textTitle}>Trip Number - 1</Text>
                <View style={styles.detailsBox}>
                    <Text style={styles.textDetails}>Destination: Srv international School </Text>
                    <Text style={styles.textDetails}>Total no. of Children - 20</Text>
                    <Text style={styles.textDetails}>Total Present - 18</Text>
                    <Text style={styles.textDetails}>Total Absent- 02</Text>
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
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
        backgroundColor:'#32cd32',
        borderRadius: 10,
        //borderWidth: 1,
        marginBottom: 15,
        //backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems:'center',
        width: '90%',
        height:70 ,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 10,
            height: 10
        }
    },
    itemText:{
        fontSize:18,
        fontWeight:'600'

    }

})