import React, { useEffect, useState } from 'react';
import { Text, Alert, View, StatusBar, TouchableOpacity, Modal, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../components/style';
import ToastComponent from '../../components/Toaster';
import axios from 'axios';
import * as ToastMessage from '../../constants/ToastMessages';
import storage from '@react-native-firebase/storage';


const Profile = ({ navigation }) => {
  const [data, getData] = useState([])
  const [isloading, setLoading] = useState(false)
  const [img, setImg] = useState('');
  const [avatar, setAvatar] = useState(true);
  const [id, setID] = useState('https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg');
  const [pic, setPic] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      setLoading(true)
      let token = await AsyncStorage.getItem('token')
      axios
        .get(`${Ngrok.url}/api/profiledetails/driver/${token}`)
        .then( async function (response) {
          getData(response.data)
          await setImg(response.data.photoUrl)
          await setID(response.data.idProofUrl)
          setLoading(false)
          if (img == null) {
            setAvatar(true)
          } else {
            setAvatar(false)
          }

        })
        .catch(function (error) {
          console.log("error", error.message);
        })
        .finally(function () {
        });
    });
    fetchData;
    //retrieveimg();
    //retrieveimg2();
  }, [navigation])
  const gallery = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    }).then(async (image) => {
      setImg(image.path)
      setModalVisible(false);
      upload();
    }
    )
  }
  const Camera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(async (image) => {
      await setImg(image.path)
      upload();
      setModalVisible(false);
    });
  }
  const upload = async () => {
    let token = await AsyncStorage.getItem('token')
    let imageName = `${token}/profile`;
    let s = decodeURI(img)
    storage()
      .ref(imageName)
      .putFile(s)
      .then((snapshot) => {
        setAvatar(false)
        Alert.alert('Image Uploaded Successfully')
      })
      .catch((e) => {
        console.log('uploading image error => ', e);
        Alert.alert('Uploading Failed');
      }
      );
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

  const retrieveimg = async () => {
    let token = await AsyncStorage.getItem('token')
    storage()
      .ref('/' + `${token}/profile`)
      .getDownloadURL()
      .then((url) => {
        setImg(url);
        if (img == null) {
          setAvatar(true)
        } else {
          setAvatar(false)
        }
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }
  const retrieveimg2 = async () => {
    let token = await AsyncStorage.getItem('token')
    storage()
      .ref('/' + `${token}/license`)
      .getDownloadURL()
      .then((url) => {
        setID(url);
        if (img == null) {
          setAvatar(true)
        } else {
          setAvatar(false)
        }
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }
  const deleteimg = async () => {
    let token = await AsyncStorage.getItem('token')
    storage()
      .ref('/' + `${token}/profile`) //name in storage in firebase console
      .delete()
      .then(() => {
        setImg(null);
        setAvatar(true);
        Alert.alert('Image deleted successfully');
      })
      .catch((e) => console.log('error on image deletion => ', e));
  }
  const onPressLogout = async () => {
    try {
      AsyncStorage.removeItem('token');
      navigation.replace('Login');
      Alert.alert('You have been logged out');
    } catch (error) {
      console.error('Error clearing app data.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />
      {pic ?
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {showtoast ? (<ToastComponent type={ToastMessage.success} message={message} />) : null}
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
                  style={{ alignSelf: 'center', marginVertical: 20 }}
                  onPress={Camera}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 19,
                    }}>
                    Open Camera <Ionicons name="camera"
                      color="#FF5C00" size={25}
                      style={styles.icon}
                    />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignSelf: 'center', marginVertical: 20 }}
                  onPress={gallery}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 19,
                    }}>
                    Choose From Gallery <Ionicons name="folder"
                      color="#FF5C00" size={25}
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
            <TouchableOpacity onPress={deleteimg} style={{ marginLeft: '35%' }}><Ionicons name="trash-bin"
              color="#FFF" size={25}
              style={styles.icon}
            /></TouchableOpacity>
            <TouchableOpacity onPress={pick} style={{ marginLeft: '35%' }}><Ionicons name="create"
              color="#FFF" size={25}
              style={styles.icon}
            /></TouchableOpacity>
          </View>
          {avatar ? <Ionicons name="camera"
            color="grey" size={300}
            style={{ alignSelf: 'center', justifyContent: 'center' }}
          /> : <Image style={{ width: '100%', height: '50%', justifyContent: 'center' }} source={{ uri: img }} />}
          <View style={{ alignItems: 'center', marginTop: "25%", justifyContent: 'flex-end' }}>
          </View>
        </View>
        : <ScrollView style={styles.container}>
          <Loader loading={isloading} />

          <TouchableOpacity style={styles.edit}
            onPress={() => navigation.navigate('Update profile', {
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
            {avatar ? <TouchableOpacity onPress={press} >
              <Ionicons name="camera"
                color="grey" size={100}
                style={styles.licence}
              />
            </TouchableOpacity>
              :
              <TouchableOpacity onPress={press} >
                <Image style={styles.licence} source={{ uri: img }} />
              </TouchableOpacity>}
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
            <Image style={styles.idproof} source={{ uri: id }} />
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
