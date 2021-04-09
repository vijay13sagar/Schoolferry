import React, { useEffect, useState } from 'react';
import { Text, Alert, View, TouchableOpacity, Modal, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../components/style';

const Profile = ({ navigation }) => {
  const [data, getData] = useState([])
  const [isloading, setLoading] = useState(false)
  const [img, setImg] = useState('https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg');
  const [pic, setPic] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const gallery = () => {
    ImagePicker.openPicker({
      // width: 350,
      // height: 175,
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    }).then(image => {
      console.log(image);
      setImg(image.path)
    });
  }
  const Camera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImg(image.path)
    });
  }
  const press = () => {
    setPic(true)
  }
  const backpress = () => {
    setPic(false)
  }
  const pick = () => {
    setModalVisible(true);
  }
  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      setLoading(true)
      let token = await AsyncStorage.getItem('token')
      fetch(`${Ngrok.url}/api/profiledetails/nanny/${token}`, {
        "method": "GET",
        "headers": {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson);
          getData(responseJson)
          setLoading(false)
        })
        .catch(err => {
          console.log(err);
        });
    });
    fetchData;
  }, [navigation])
  const onPressLogout = async () => {
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // await AsyncStorage.multiRemove(keys);
      AsyncStorage.removeItem('token');
      console.log("working");
      navigation.replace('Login');
      Alert.alert('You have been logged out');
    } catch (error) {
      console.error('Error clearing app data.');
    }
    //AsyncStorage.removeItem('token');
    //window.localStorage.clear();
    //AsyncStorage.clear()

  }

  return (
    <View style={styles.container}>{pic ?
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Ionicons
              name="close-circle-outline"
              color="#fff"
              size={30}
              style={styles.icon}
              onPress={(modalVisible) => setModalVisible(!modalVisible)}
            />
            <View style={styles.modalBody1}>
              <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: 5 }}
                onPress={Camera}>
                <Text
                  style={{
                    color: '#1E90FF',
                    fontSize: 19,
                  }}>
                  Open Camera <Ionicons name="camera"
                    color="#1E90FF" size={25}
                    style={styles.icon}
                  />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: 20 }}
                onPress={gallery}>
                <Text
                  style={{
                    color: '#1E90FF',
                    fontSize: 19,
                  }}>
                  Choose From Gallery <Ionicons name="folder"
                    color="#1E90FF" size={25}
                    style={styles.icon}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: 'row', marginBottom: '35%', marginLeft: 10, marginTop: 10 }}>
          <TouchableOpacity onPress={backpress} style={{ justifyContent: 'flex-start' }}><Ionicons name="arrow-back"
            color="#FFF" size={25}
            style={styles.icon}
          /></TouchableOpacity>
          <TouchableOpacity onPress={pick} style={{ marginLeft: '80%' }}><Ionicons name="create"
            color="#FFF" size={25}
            style={styles.icon}
          /></TouchableOpacity>
        </View>
        <Image style={{ width: '100%', height: '50%', justifyContent: 'center' }} source={{ uri: img }} />
      </View>
      : <ScrollView style={styles.container}>
        <Loader loading={isloading} />
       
        <TouchableOpacity style={styles.edit}
          onPress={() => navigation.navigate('Updateprof', {
            con: data.contact,
            add: data.address,
          })
          }>
          <Text style={styles.loginText} >Edit <Ionicons name="create"
            color="#FFF" size={19}
            style={styles.icon}
          /></Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={press} >
            <Image style={styles.licence} source={{ uri: img }} />
            {/* <Ionicons name="camera"
      color="white" size={20}
      style={{backgroundColor:'#FF5C00',marginTop:90,borderRadius:25,justifyContent:'flex-end',alignSelf:'flex-end'}}
      /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>Hello,{data.name}</Text>
        </View>

        <View style={styles.textview}>
          <Text style={styles.headertext} > User ID</Text>
          <Text style={styles.details}>{data.id}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >Name</Text>
          <Text style={styles.details}>{data.name}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >Contact</Text>
          <Text style={styles.details}>{data.contact}</Text>
        </View>

        <View style={styles.textview}>
          <Text style={styles.headertext} >Address</Text>
          <Text style={styles.details}>{data.address}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.headertext} >ID Proof</Text>
          <Image style={styles.idproof} source={{ uri: img }} />
        </View>
        <TouchableOpacity style={styles.loginBtn}
        >
          <Text style={styles.loginText} onPress={() => navigation.navigate("Change Password")}
          >
            Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => onPressLogout()}  >
          <Text style={styles.loginText}>Log Out <Ionicons name="log-out-outline"
            color="#FFF" size={19}
            style={styles.icon}
          /></Text>
        </TouchableOpacity>
      </ScrollView>
    }
    </View>


  );
}

export default Profile;
