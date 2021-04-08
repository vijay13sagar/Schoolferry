import React, { useState } from "react";
import { Text, StyleSheet, Image,ImageBackground, TextInput,Modal, TouchableOpacity, Alert, View, CameraRoll } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const App = () => {
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
const pick=()=>{
setModalVisible(true);
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
style={{alignSelf: 'center', marginTop: 5}}
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
style={{alignSelf: 'center', marginTop: 20}}
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
<View style={{ flexDirection:'row',marginBottom: '35%', marginLeft: 10, marginTop: 10}}>
<TouchableOpacity onPress={backpress} style={{ justifyContent: 'flex-start' }}><Ionicons name="arrow-back"
color="#FFF" size={25}
style={styles.icon}
/></TouchableOpacity>
<TouchableOpacity onPress={pick} style={{ marginLeft:'80%' }}><Ionicons name="create"
color="#FFF" size={25}
style={styles.icon}
/></TouchableOpacity>
</View>
<Image style={{ width: '100%', height: '50%', justifyContent: 'center' }} source={{ uri: img }} />
</View>
:<View> 
<View style={{flexDirection:'row',alignSelf:'center'}}>
<TouchableOpacity onPress={press} >
<Image style={styles.licence}source={{ uri: img }}/>
{/* <Ionicons name="camera"
color="white" size={20}
style={{backgroundColor:'#FF5C00',marginTop:90,borderRadius:25,justifyContent:'flex-end',alignSelf:'flex-end'}}
/> */}
</TouchableOpacity>
</View>
<TouchableOpacity style={styles.loginBtn} onPress={gallery} >
<Text style={styles.loginText}>Choose from Gallery</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.loginBtn} onPress={Camera} >
<Text style={styles.loginText}>Open Camera</Text>
</TouchableOpacity>
</View>
}
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#F9F2F2",
},
licence: {
marginTop:20,
height: 100,
width: 100,
borderRadius:50,
alignSelf: 'center'
},
loginBtn: {
width: "60%",
borderRadius: 10,
height: 41,
alignItems: "center",
justifyContent: "center",
alignSelf: 'center',
marginTop: 31,
backgroundColor: "#ff5c8d",
},
modalContainer: {
backgroundColor: '#000000',
flex: 1,
//height: '50%',
justifyContent: 'center'
},
modalBody1: {
backgroundColor: '#fff',
borderRadius: 10,
height: 280,
width: '88%',
alignSelf: 'center',
justifyContent: 'center',
},
message1: {
fontSize: 22,
textAlign: 'center',
//marginTop: 30
color: '#000',
fontWeight: '600',
padding: 7,
},
icon: {
alignSelf: 'flex-end',
marginRight: 10,
},
});
export default App;