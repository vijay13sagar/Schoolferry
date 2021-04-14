import React, { useState } from "react";
import {

  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Modal, ImageBackground, CameraRoll, ScrollView,

} from "react-native";
import Ngrok from '../../constants/ngrok';
import Loader from '../../components/Loader';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin';
import ImagePicker from 'react-native-image-crop-picker';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';



export default function Add_Driver({ navigation }) {
  const [isloading, setLoading] = useState(false);
  const [img, setImg] = useState('https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg');
  const [pic, setPic] = useState(false);
  const [name, setname] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setpassword] = useState("");

  const [contact, setcontact] = useState("");
  const [ADR, setADR] = useState("");
  const [LIN, setLIN] = useState("");
  const [EXP, setEXP] = useState("");
  const [{ emailError }, setEmailError] = useState("");
  const [{ contactError }, setcontactError] = useState("");
  const [{ emptyFields }, setemptyFeilds] = useState("");

  const [showtoast, setToast] = useState(false)
  const [message, SetMessage] = useState()
  const [img1, setImg1] = useState('https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg');
  const [pic1, setPic1] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const gallery1 = () => {
    ImagePicker.openPicker({
      // width: 350,
      // height: 175,
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    }).then(image => {
      console.log(image);
      setImg1(image.path)
    });
  }
  const Camera1 = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImg1(image.path)
    });
  }
  const press1 = () => {
    setPic1(true)
  }
  const backpress1 = () => {
    setPic1(false)
  }
  const pick1 = () => {
    setModalVisible1(true);
  }


  const validatecontact = (contact) => {

    var regex_phone = /^((\+91)?|91)?[789][0-9]{9}/

    if (regex_phone.test(contact)) {
      return true
    }
    else { return false }

  };

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

  const validateFunction = () => {

    if (!name || !EXP || !contact || !ADR || !LIN || !password) {
      setemptyFeilds({ emptyFields: "Please Enter All The Details" })
      setcontactError({ contactError: null })

      return false
    }

    else if (!validatecontact(contact)) {
      setcontactError({ contactError: "Enter Valid Phone Number" })
      setEmailError({ emailError: null })

      return false
    }


    return true

  }

  function pressHandler() {
    console.log("validation", validateFunction())
    if (validateFunction()) {

      console.log("apistarts")

      try {
        setLoading(true);

        axios({
          method: 'POST',
          url: `${Ngrok.url}/api/admin/register/driver`,
          "headers": {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            name: name,
            //email: email,
            contact: contact,
            address: ADR,
            experience: EXP,
            photourl: "NULL",
            idproofurl: "NULL",
            password: password

          }
        })
          .then(function (response) {
            setLoading(false);
            if (response.status == 200) {
              Alert.alert('Registration Successful', '', [{ text: 'Proceed', onPress: () => navigation.navigate('Employee',) }])
            }

            console.log("response", response.status);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            if (error.response.status == 401) {
              setLoading(false);
              //redirect to login
              // Alert.alert('Phone Number Alredy Exist!')
              setToast(true)
            }

          })

      }
      catch (error) {

        setLoading(false);
        console.log("errordetails", error);
      }
    }
    setToast(false)
  }


  return (
    <View style={styles.container3}>
      <ScrollView>
        {showtoast ? (<ToastComponent type={ToastMessage.failure} message={ToastMessage.message3} />) : null}
        
          <View >
        {pic ?
          <View style={{ width: "70%", height: "70%", backgroundColor: 'black',alignSelf:"center" }}>
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
            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
              <TouchableOpacity onPress={backpress} style={{ justifyContent: 'flex-start' }}><Ionicons name="arrow-back"
                color="#FFF" size={25}
                style={styles.icon}
              /></TouchableOpacity>
              <TouchableOpacity onPress={pick} style={{ marginLeft: '75%' }}><Ionicons name="create"
                color="#FFF" size={25}
                style={styles.icon}
              /></TouchableOpacity>
            </View>
            <Image style={{ width: '100%', height: '75%', alignSelf: 'center' }} source={{ uri: img }} />
          </View>
          : <View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity onPress={press} >
                <Image style={styles.licence1} source={{ uri: img }} />
                {/* <Ionicons name="camera"
      color="white" size={20}
      style={{backgroundColor:'#FF5C00',marginTop:90,borderRadius:25,justifyContent:'flex-end',alignSelf:'flex-end'}}
      /> */}
              </TouchableOpacity>
            </View>

          </View>
        }
        <View>
          <Text style={styles.TextInput4}>
            uploade image
           </Text>
        </View>
        </View>
        <View>
        {pic1 ?
          <View style={{width: "70%", height: "70%", backgroundColor: 'black',alignSelf:"center"}}>
            <Modal animationType="slide"  transparent={true} visible={modalVisible1}>
              <View style={styles.modalContainer}>
                <Ionicons
                  name="close-circle-outline"
                  color="#fff"
                  size={30}
                  style={styles.icon}
                  onPress={(modalVisible1) => setModalVisible1(!modalVisible1)}
                />
                <View style={styles.modalBody1}>
                  <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 5 }}
                    onPress={Camera1}>
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
                    onPress={gallery1}>
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
            <View style={{ flexDirection: 'row',  marginLeft: 10, marginTop: 10 }}>
              <TouchableOpacity onPress={backpress1} style={{ justifyContent: 'flex-start' }}><Ionicons name="arrow-back"
                color="#FFF" size={25}
                style={styles.icon}
              /></TouchableOpacity>
              <TouchableOpacity onPress={pick1} style={{ marginLeft: '75%' }}><Ionicons name="create"
                color="#FFF" size={25}
                style={styles.icon}
              /></TouchableOpacity>
            </View>
            <Image style={{ width: '100%', height: '75%', alignSelf: 'center'  }} source={{ uri: img1 }} />
          </View>
         
          : <View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity onPress={press1} >
                <Image style={styles.licence} source={{ uri: img1 }} />
                {/* <Ionicons name="camera"
      color="white" size={20}
      style={{backgroundColor:'#FF5C00',marginTop:90,borderRadius:25,justifyContent:'flex-end',alignSelf:'flex-end'}}
      /> */}
              </TouchableOpacity>
            </View>

          </View>
        }
        <View>
          <Text style={styles.TextInput4}>
            uploade Licence
           </Text>
        </View>
        </View>
       
        
        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Name"
            placeholderTextColor="#929292"
            onChangeText={(name) => setname(name)}
          />
        </View>
        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Mobile Number"
            keyboardType="numeric"
            placeholderTextColor="#929292"
            onChangeText={(contact) => setcontact(contact)}
          />
        </View>

        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Address"
            placeholderTextColor="#929292"
            onChangeText={(ADR) => setADR(ADR)}
          />
        </View>
        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Exp"

            placeholderTextColor="#929292"
            onChangeText={(EXP) => setEXP(EXP)}
          />
        </View>
        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Licence No"
            keyboardType="numeric"
            placeholderTextColor="#929292"
            onChangeText={(LIN) => setLIN(LIN)}
          />
        </View>
        
        <View style={styles.inputView1}>
          <TextInput
            style={styles.TextInput2}
            placeholder="Password"
            placeholderTextColor="#929292"
            secureTextEntry={true}
            onChangeText={(password) => setpassword(password)}
          />
        </View>

        <Text style={styles.error}>{emptyFields}</Text>
        <Text style={styles.error}>{emailError}</Text>
        <Text style={styles.error}>{contactError}</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={pressHandler} >
          <Text style={styles.TextInput}>Confirm</Text>

        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

