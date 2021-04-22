import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
} from "react-native";
import styles from '../../components/styles_admin'
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function nanny_Details({route}){
  const [dimg, setdImg] = useState('https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-512.png ');
  const [dimg1, setdImg1] = useState('https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/grandma_elderly_nanny_avatar-512.png ');
  const [img, setImg] = useState(route.params.item.idProofUrl);
  const [userrimg, setuserImg] = useState(route.params.item.photoUrl);
  const [pic, setPic] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  console.log('details',route.params.item);
  const gallery = () => {
    ImagePicker.openPicker({
      
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true
    }).then(image => {
     
      setImg(image.path)
    });
  }
  const Camera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 350,
      compressImageMaxHeight: 175,
      cropping: true,
    }).then(image => {
      
      setImg(image.path)
    });
  }
  const backpress = () => {
    setPic(false)
     setModalVisible(false)
  }
  const pick = () => {
    setModalVisible(true);
    setPic(true)
  }
 
  return (
    <View style={styles.container4}>
      <ScrollView>
      <StatusBar style="auto" />
      <Image style={styles.licence1} source={userrimg=="NULL" ? {uri:dimg} : {uri:userrimg}} />
      <View style={{marginTop:10,marginBottom:10,alignSelf: "center",}}>
       
        
        <Text style={{ fontSize: 22,
        color: "black",
        fontWeight: '700',
        
    }}>
          {route.params.item.name}
          </Text>
      </View> 
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
                <Image style={styles.licence} source={img=="NULL" ? {uri:dimg1} : {uri:img}} />
                
              </TouchableOpacity>
            </View>

          </View>
        }
        <View style={{marginTop:10,marginBottom:10,alignSelf: "center",}}>
          <Text style={{fontSize: 19,
        color: "black",
        fontWeight: '700',
        
        alignSelf:"center"}}>
          Gov ID
           </Text>
        </View>
        </View>
      <View style={{marginRight:230,alignItems: "center",}}>
        <Text>Phone Number</Text></View> 
        <View style={styles. details}>
        <Text>
          {route.params.item.contact}
          </Text>
      </View>
      <View style={{marginRight:265,alignItems: "center",}}>
        <Text>Address</Text></View>
        <View style={styles. details}>
        <Text>
          {route.params.item.address}
          </Text>
      </View>
      
       
      <View>
          <TouchableOpacity style={styles.loginBtn}  >
            <Text style={styles.TextInput}>Remove</Text>

          </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
}
