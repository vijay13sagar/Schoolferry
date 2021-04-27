import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Modal,Image,
  Switch,
} from 'react-native';
import { Card, CardItem, Body } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Tripdetails = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [but, setBut] = useState('Start Trip');
  const [defimg, setDef] = useState('https://www.shareicon.net/data/512x512/2016/06/25/786525_people_512x512.png');
  const [locdisable, setLoc] = useState();
  const [details, setDet] = useState([]);
  const [item1, setItem1] = useState([]);
  const [absentee, setInfo] = useState();
  let TripID = route.params.item.trip_id;
  let VehicleID = route.params.item.vehilce;
  const [refreshing, setRefreshing] = React.useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Children();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const Children = () => {
    axios
    .get(`${Ngrok.url}/api/driver/trip/${TripID}`)
    .then(function (response) {
      setInfo(response.data.noOfChildrenAbsent);
      setLoc(response.data.startedTripAt);
      setDet(response.data.childList);
    })
    .catch(function (error) {
      console.log("error",error.message);
    })
    .finally(function () {
    });
  };
  useEffect(() => {
    Children();
  }, []);

  const SetSwitchValue = (id, value) => {
    try {
      axios
      .post(`${Ngrok.url}/api/driver/attendance`, {
        childid: id,
        tripid: TripID, 
        attendance: value,
      })
      .then(function (response) {
        if (response.data.message == 'attendance marked') {
          onRefresh();
        }
      });
    } catch (error) {
      console.log('errordetails', error);
    }
  };

  const starting = async () => {
    setBut('Trip Inprogress');
    try {
      axios
      .post(`${Ngrok.url}/api/driver/trip/start`, {
        tripid: route.params.item.trip_id,
      })
      .then(function (response) {
        if (response.status == 200) {    
          setToast(true);
          SetMessage(ToastMessage.drivestart);
          onRefresh();
        }
      });
    } catch (error) {
      console.log('errordetails', error);
    }
    setToast(false);
  };
  const Nannyprofile = () => {
    return (
      <View >
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Id:</Text>
          <Text style={styles.textDetails}>
            {' '}
            {route.params.item.nannyInfo.nannyId}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Name:</Text>
          <Text style={styles.textDetails}>
            {' '}
            {route.params.item.nannyInfo.nannyName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Contact:</Text>
          <Text style={styles.textDetails}>
            {' '}
            {route.params.item.nannyInfo.nannyContact}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      {showtoast ? (
        <ToastComponent type={ToastMessage.success} message={message} />
      ) : null}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="close-circle-outline"
            color="#fff"
            size={30}
            style={styles.icon}
            onPress={(modalVisible) => setModalVisible(!modalVisible)}
          />
          <View style={styles.modalBody}>
            <Image style={styles.licence1} source={item1.photoUrl == "NULL" || item1.photoUrl == null ? { uri: (defimg) }:{ uri: (item1.photoUrl) }} />
            <Text style={styles.newsText}>Name - {item1.childName} </Text>
            <Text style={styles.newsText}>Age - {item1.age}</Text>
            <Text style={styles.newsText}>
              Blood Group - {item1.bloodGroup}
            </Text>
            <Text style={styles.newsText}>
              Parent's Contact - {item1.parentsContact}
            </Text>
            <Text style={styles.newsText}>Address - {item1.address}</Text>
            <Text style={styles.newsText}>School - {item1.school}</Text>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headingcontainer}>
          <Text style={styles.tripsTitleText}>
            Trip ID - {route.params.item.trip_id}
          </Text>
          <View style={styles.detailsBox}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Destination:</Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.destination}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Start Location:</Text>
              <Text style={styles.textDetails}>
              {' '}{route.params.item.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Vehicle ID</Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.vehilce}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Total Children:</Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.noOfChildren}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Total Absent:</Text>
              <Text style={styles.textDetails}>{' '}{absentee}</Text>
            </View>

            {route.params.item.nannyInfo.nannyId ? <Nannyprofile /> : null}
          </View>
        </View>
        <TouchableOpacity
          style={!locdisable ? styles.loginBtn : styles.disableBtn}
          disabled={locdisable}
          onPress={() => {
            starting();
          }}>
          <Text style={locdisable ? {color: 'black'} : styles.loginText}>
            {but}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!locdisable}
          style={!locdisable ? styles.disableBtn : styles.loginBtn}
          onPress={() =>
            navigation.navigate('Map', {
              screen: 'Trackee',
              params: {tripid: route.params.item.trip_id},
            })
          }>
          <Text style={!locdisable ? {color: 'black'} : styles.loginText}>
            Live location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            navigation.navigate('Check_list', {
              TripID: TripID,
              VehicleID: VehicleID,
            })
          }>
          <Text style={styles.loginText}>Check List</Text>
        </TouchableOpacity>
        <Text style={styles.absent}>Marked Absent</Text>
        <FlatList
          data={details}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>

              <Card style={styles.driverchild}>
                <CardItem button onPress={() =>{setModalVisible(!modalVisible)
                  setItem1(item);
                }}>
                  <Body style={{ flexDirection: 'row' }}>
                    <Image style={styles.payicon} source={item.photoUrl == "NULL" || item.photoUrl == null ? { uri: (defimg) }:{ uri: (item.photoUrl) }} />
                    <Text style={styles.childcardtext}>
                    {item.childName}
                </Text>
                  </Body>
                </CardItem>
              </Card>
              <Switch
                value={item.attendance}
                onValueChange={(value) => {
                  SetSwitchValue(item.childId, value);
                }}
                style={styles.switchstyle}
              />
            </View>
          )}
          keyExtractor={(item) => item.childId}
        />
      </ScrollView>
    </View>
  );
};
export default Tripdetails;
