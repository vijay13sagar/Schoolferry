




// import React, { useState } from 'react'
// import { Pressable ,StyleSheet,
//   Alert,
//   Modal,
//   StatusBar,
//   Text,
//   View,
//   Image,
//   TextInput,
//   CheckBox,
//   Button,
//   TouchableHighlight,

//   TouchableOpacity,} from 'react-native';
//  const App = () => {
// const [show, SetShow] = useState(false);
// const pressme =() =>{
//   return(
//   <View style={styles.textview}>
//         <Text style={styles.headertext} >Card Number</Text>
//         <TextInput
//           style={styles.TextInput}
//           placeholder="Card Number"
//           placeholderTextColor="#929292"
//         />
//       </View>
//   );
// }
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => pressme()}><Text>card payment</Text>
//         {/* {show === false ? pressme() : <View style={styles.textview}><Text style={styles.headertext} >Name on Card</Text>
//       <TextInput style={styles.TextInput} placeholder="Name" placeholderTextColor="black"
// /></View>} */}
//       </TouchableOpacity>
//     </View>
//   );
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F2F2",
    justifyContent: "center",
  },
  check:{
 marginLeft:35,
  },

  image: {
    marginBottom: 40,
  },
  error: {
    color: '#dc143c',
    fontSize: 11,
    marginTop:2,
  alignSelf:'center',
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,alignSelf: "center",
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },textview: {
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#b0003a',
    borderRadius: 10,
    width: "80%",
    height: 45,alignSelf: "center",
    alignItems: "center",
    backgroundColor:"#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
    
  },
  headertext: {
    fontSize: 13,
    marginLeft: 35,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    marginTop:20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 15,
    color: '#1e90ff',

  },

  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff5c8d",
    alignSelf: "center",
    marginBottom: 90,
  },
  registerTextStyle: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
    alignSelf:"center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width:'70%',
    backgroundColor: "#4DAFCE",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginBottom:180,
  },
  openButtono: {
    backgroundColor: "#4DAFCE",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:"red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }

});
// export default App;
// //     <View style={styles.container}>
// //       <StatusBar
// //         barStyle="light-content"
// //         // dark-content, light-content and default
// //         hidden={false}
// //         //To hide statusBar
// //         backgroundColor="#e91e63"
// //         //Background color of statusBar only works for Android
// //         translucent={false}
// //       //allowing light, but not detailed shapes

// //       />

// // //       <View style={styles.textview}>
// // //         <Text style={styles.headertext} >Name on Card</Text>
// // //         </View>
// // //       <View style={styles.inputView}>
// // //         <TextInput
// //           style={styles.TextInput}
// //           placeholder="Name"
// //           placeholderTextColor="#929292"
// //           onChangeText={(NOC) => setNOC(NOC)}
// //         />
// //       </View>
// //       <View style={styles.textview}>
// //         <Text style={styles.headertext} >Card Number</Text>
// //         </View>
// //       <View style={styles.inputView}>
// //         <TextInput
// //           style={styles.TextInput}
// //           placeholder="Card Number"
// //           placeholderTextColor="#929292"
// //           onChangeText={(CardN) => setCardN(CardN)}
// //         />
// //       </View>
// //       <View style={styles.textview}>
// //         <Text style={styles.headertext} >CVV</Text>
// //         </View>
// //       <View style={styles.inputView}>
// //         <TextInput
// //           style={styles.TextInput}
// //           placeholder="CVV"
// //           placeholderTextColor="#929292"
// //           secureTextEntry={true}
// //           onChangeText={(CVV) => setCVV(CVV)}
// //         />
// //       </View>
// //       <View style={styles.textview}>
// //         <Text style={styles.headertext} >Expiry Date</Text>
// //         </View>
// //       <View style={styles.inputView}>
// //         <TextInput
// //           style={styles.TextInput}
// //           placeholder="Expiry Date"
// //           placeholderTextColor="#929292"
// //           onChangeText={(Expiry) => setExpiry(Expiry)}
// //         />
// //       </View>
// //       <View style={{flexDirection:'row'}}>
// //       <CheckBox
// //           value={isSelected}
// //           onValueChange={setSelection}
// //           style={styles.check}
// //         />
// //         <Text style={{fontSize:15}}>Save Card Details: {isSelected ? "👍" : "👎"}</Text>
// //         </View>
       
      
      
// //       <View style={styles.textview}>
// //         <Text style={styles.headertext} > ------------------------------------------OR----------------------------------------- </Text>
// //         </View>
// //       <View style={styles.textview}>
// //         <Text style={styles.headertext} >Enter UPI ID</Text>
// //         </View>
// //       <View style={styles.inputView}>
// //         <TextInput
// //           style={styles.TextInput}
// //           placeholder="UPI ID"
// //           placeholderTextColor="#929292"
          
// //           onChangeText={(UPI) => setUPI(UPI)}
// //         />
// //       </View>
// //        {/* <View style={styles.centeredView}>
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => {
// //           Alert.alert("Modal has been closed.");
// //         }}
// //       >
// //         <View style={styles.centeredView}>
// //           <View style={styles.modalView}>
// //             <Text style={{
// //     marginBottom: 15,
// //     textAlign: "center",
// //   }}>Payment Successful</Text>

// //             <TouchableHighlight
// //               style={{ ...styles.openButtono, backgroundColor: "#2196F3" }}
// //               onPress={() => {
// //                 setModalVisible(!modalVisible);
// //               }}
// //             >
// //               <Text style={styles.textStyle}>OK</Text>
// //             </TouchableHighlight>
// //           </View>
// //         </View>
// //       </Modal>

     
// //     </View> */}
// //     <View style={styles.centeredView}>
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => {
// //           Alert.alert("Modal has been closed.");
// //         }}
// //       >
// //         <View style={styles.centeredView}>
// //           <View style={styles.modalView}>
// //             <Text style={styles.modalText}>Payment Failed</Text>

// //             <TouchableHighlight
// //               style={{ ...styles.openButtono, backgroundColor: "#2196F3" }}
// //               onPress={() => {
// //                 setModalVisible(!modalVisible);
// //               }}
// //             >
// //               <Text style={styles.textStyle}>OK</Text>
// //             </TouchableHighlight>
// //           </View>
// //         </View>
// //       </Modal>
// //      </View>
// //       <Text style={styles.error}>{value_error}</Text>
// //       <TouchableHighlight
// //         style={styles.loginBtn}
// //         onPress={() => {
// //           setModalVisible(true);
// //         }}
// //       >
// //         <Text style={styles.textStyle}>Confirm</Text>
// //       </TouchableHighlight>

// //     </View>

// //   );
// // }

