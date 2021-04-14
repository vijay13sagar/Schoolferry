import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Checklist = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [but, setBut] = useState('Start Trip');
  const [locdisable, setLoc] = useState();
  const [details, setDet] = useState([]);
  const [item1, setItem1] = useState([]);
  const [absentee, setInfo] = useState();
  let TripID = route.params.item.trip_id;
  let VehicleID = route.params.item.vehilce;
  const [refreshing, setRefreshing] = React.useState(false);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();

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
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setInfo(responseJson.noOfChildrenAbsent);
        setLoc(responseJson.startedTripAt);
        setDet(responseJson.childList);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  useEffect(() => {
    Children();
  }, []);

  const SetSwitchValue = (id, value) => {
    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/driver/attendance`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          childid: id, //item1.childId
          tripid: TripID, //route.params.item.trip_id
          attendance: value,
        },
      }).then(function (response) {
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
    //setLoc(false);

    try {
      axios({
        method: 'POST',
        url: `${Ngrok.url}/api/driver/trip/start`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          tripid: route.params.item.trip_id,
        },
      }).then(function (response) {
        if (response.status == 200) {
          
          setToast(true);
          SetMessage(ToastMessage.drivestart);
          console.log('toast', showtoast);

          onRefresh();
        }
        console.log('response for starttrip', response.status);
      });
    } catch (error) {
      console.log('errordetails', error);
    }
    setToast(false);
  };
  const Nannyprofile = () => {
    return (
      <View style={styles.detailsBox}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Id - </Text>
          <Text style={styles.textDetails}>
            {' '}
            {route.params.item.nannyInfo.nannyId}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Name - </Text>
          <Text style={styles.textDetails}>
            {' '}
            {route.params.item.nannyInfo.nannyName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.textHeads}>Nanny Contact - </Text>
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
            <Text style={styles.message}>Child Details</Text>
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
        <View style={styles.firstbox1}>
          <Text style={styles.textTitle}>
            Trip ID - {route.params.item.trip_id}
          </Text>
          <View style={styles.detailsBox}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Destination: </Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.destination}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Start Location:</Text>
              <Text style={styles.textDetails}>
                {route.params.item.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Vehicle ID: </Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.vehilce}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Total Children: </Text>
              <Text style={styles.textDetails}>
                {' '}
                {route.params.item.noOfChildren}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.textHeads}>Total Absent - </Text>
              <Text style={styles.textDetails}> {absentee}</Text>
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
          data={details} //item2
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={styles.childcard}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setItem1(item);
                }}>
                <Text style={styles.itemText}>
                  {item.childName}
                  {/*item.childId*/}
                </Text>
              </TouchableOpacity>
              <Switch
                //trackColor={{true: 'red', false: 'grey'}}
                value={item.attendance}
                onValueChange={(value) => {
                  SetSwitchValue(item.childId, value);
                }}
                style={{marginLeft: 10}}
              />
            </View>
          )}
          keyExtractor={(item) => item.childId}
        />
      </ScrollView>
    </View>
  );
};
export default Checklist;
