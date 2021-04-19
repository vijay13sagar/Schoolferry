import React, { useState } from "react";
import {

  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Modal, ScrollView,

} from "react-native";
import Ngrok from '../../constants/ngrok';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin';
import ImagePicker from 'react-native-image-crop-picker';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import storage from '@react-native-firebase/storage';



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
      compressImageMaxWidth:350,
      //compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    })
    .then( async image => {
     
      await setImg1(image.path);
      upload2();
      
    });
  }
  const Camera1 = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(async image => {
      
      await setImg1(image.path)
      upload2();
    });
  }
  
  const backpress1 = () => {
    setPic1(false)
   setModalVisible1(false)
  }
  const pick1 = () => {
    setModalVisible1(true);
    setPic1(true)
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
     
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    }).then(async image => {
      
      await setImg(image.path)
      upload1();
      
    });
  }
  const Camera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(async image => {
     
      await setImg(image.path)
      upload1();
    });
  }
  const upload1 = async () => {
    let imageName  =`Driver/profile/${uuidv4()}`;
    //let imageName = `${id}/profile`;
    let s=decodeURI(img)
    storage()
      .ref(imageName)
      .putFile(s)
      .then(async (snapshot) => {
       
        Alert.alert('Image Uploaded Successfully');
        let imageRef=storage().ref(imageName)
       
        const url1 =await imageRef.getDownloadURL().catch((error) => { throw error });
        console.log("url",url1);
      })
      .catch((e) => {
        
        Alert.alert('Uploading Failed');
        
    }
      );
  }
  const upload2 = () => {
    let imageName  =`Driver/id/${uuidv4()}`;
    console.log("name",imageName);
    //let imageName = `${id}/license`;
    let s=decodeURI(img1)
    storage()
      .ref(imageName)
      .putFile(s)
      .then(async (snapshot) => {
       console.log("snapshot",snapshot);
        Alert.alert('Image Uploaded Successfully')
        let imageRef=storage().ref(imageName)
        const url2 =await imageRef.getDownloadURL().catch((error) => { throw error });
  console.log("url",url2);
        })
      .catch((e) => {
        
        Alert.alert('Uploading Failed');
       
    }
      );
  }
  
  const backpress = () => {
    setPic(false)
     setModalVisible(false)
  }
  const pick = () => {
    setModalVisible(true);
    setPic(true)
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
   
    if (validateFunction()) {
      
      

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
            contact: contact,
            address: ADR,
            experience: EXP,
            photourl: url1,
            idproofurl: url2,
            password: password

          }
        })
          .then(async function (response) {
            setLoading(false);
            if (response.status == 200) {
              Alert.alert('Registration Successful', '', [{ text: 'Proceed', onPress: () => navigation.navigate('Employee',) }])
            }

           
          })
          .catch(function (error) {
            setLoading(false);
            
            if (error.response.status == 401) {
              setLoading(false);
             
              setToast(true)
            }

          })

      }
      catch (error) {

        setLoading(false);
       
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
          <View >
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
              <View style={styles.modalContainer}>
                <Ionicons
                  name="close-circle-outline"
                  color="#fff"
                  size={30}
                  style={styles.icon}
                  onPress={backpress}
                />
                <View style={styles.modalBody1}>
                  <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 5 }}
                    onPress={Camera}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                      }}>
                      Open Camera <Ionicons name="camera"
                        color="#FF5C00" size={25}
                        style={styles.icon}
                      />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    onPress={gallery}>
                    <Text
                      style={{
                        color: 'black',
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
          </View>
          : <View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity onPress={pick} >
                <Image style={styles.licence1} source={{ uri: img }} />
              </TouchableOpacity>
            </View>

          </View>
        }
        <View>
          <Text style={styles.TextInput4}>
            user image
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
            maxLength={10}
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
            maxLength={2}
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
        <View >
        {pic1 ?
          <View >
            <Modal animationType="slide"  transparent={true} visible={modalVisible1}>
              <View style={styles.modalContainer}>
                <Ionicons
                  name="close-circle-outline"
                  color="#fff"
                  size={30}
                  style={styles.icon}
                  onPress={backpress1}
                />
                <View style={styles.modalBody1}>
                  <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 5 }}
                    onPress={Camera1}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                      }}>
                      Open Camera <Ionicons name="camera"
                        color="#FF5C00" size={25}
                        style={styles.icon}
                      />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 20 }}
                    onPress={gallery1}>
                    <Text
                      style={{
                        color: 'black',
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
          </View>
         
          : <View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity onPress={pick1} >
                <Image style={styles.licence} source={{ uri: img1 }} />
                
              </TouchableOpacity>
            </View>

          </View>
        }
        <View>
          <Text style={styles.TextInput4}>
           Licence
           </Text>
        </View>
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