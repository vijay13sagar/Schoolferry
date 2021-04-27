import React, { useEffect, useState } from 'react';
import { Text, Alert, View, StatusBar, TouchableOpacity, Modal, Image } from 'react-native';
import Ngrok from '../../constants/ngrok'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../components/style';
import axios from 'axios';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import storage from '@react-native-firebase/storage';

const Profile = ({ navigation }) => {
  const [data, getData] = useState([])
  const [isloading, setLoading] = useState(false)
  const [img, setImg] = useState('https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-512.png ');
  const [id, setID] = useState('data:image/png;base64,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');
  const [pic, setPic] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = navigation.addListener('focus', async () => {
      setLoading(true)
      let token = await AsyncStorage.getItem('token')
      axios
        .get(`${Ngrok.url}/api/profiledetails/nanny/${token}`)
        .then(function (response) {
          getData(response.data)
          if (response.data.photoUrl !== null && response.data.photoUrl !== 'NULL') {
            setImg(response.data.photoUrl)
          }
          if (response.data.idProofUrl !== null && response.data.idProofUrl !== 'NULL') {
            setID(response.data.idProofUrl)
          }
          setLoading(false)
        })
        .catch(function (error) {
          console.log("error", error.message);
        })
        .finally(function () {
        });
    });
    fetchData;
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
  const deleteimg = async () => {
    let token = await AsyncStorage.getItem('token')
    storage()
      .ref('/' + `${token}/profile`)
      .delete()
      .then(() => {
        setImg(null);
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
      console.log('Error clearing app data.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
      />{pic ?
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
            {/* PLANNED FOR IMPROVEMENT */}
            {/* <TouchableOpacity onPress={deleteimg} style={{ marginLeft: '35%' }}><Ionicons name="trash-bin"
            color="#FFF" size={25}
            style={styles.icon}
          /></TouchableOpacity>
          <TouchableOpacity onPress={pick} style={{ marginLeft: '35%' }}><Ionicons name="create"
            color="#FFF" size={25}
            style={styles.icon}
          /></TouchableOpacity> */}
          </View>
          <Image style={styles.expand} source={{ uri: img }} />
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
