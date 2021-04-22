import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList,StatusBar,
    TouchableOpacity,Image,
    Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, CardItem, Body } from 'native-base';
import styles from '../../components/style';

const Endedtrips = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [item1, setItem1] = useState([]);
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
            <ScrollView>
            <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
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
                        <Image style={styles.licence1} source={require('../../assets/UPI1.png')} />
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
            <View style={styles.firstbox1} >
                    <Text style={styles.textTitle}>Trip ID - {route.params.item.trip_id}</Text>
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
                        <Text>{route.params.item.nannyInfo.nannyId ? <Nannyprofile /> : null}</Text>
                </View>
                <FlatList
                    data={item2}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', }}>
                            <Card style={styles.card3}>
                                <CardItem button onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setItem1(item);
                                }}>
                                    <Body style={{ flexDirection: 'row' }}>
                                        <Image style={styles.payicon} source={require('../../assets/UPI1.png')} />
                                        <Text style={{ fontSize: 17, fontWeight: '700', marginLeft: 100 }}>
                                            {item.childName}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            {/* <TouchableOpacity style={styles.childcard} onPress={() => {
                                setModalVisible(!modalVisible)
                                setItem1(item)
                            }}>
                                <Text style={styles.itemText}>{item.childName},{item.childId}</Text>
                            </TouchableOpacity> */}
                        </View>
                    )}
                    keyExtractor={item => item.childId}
                />
                </ScrollView>
        </View>
    );
}

export default Endedtrips;