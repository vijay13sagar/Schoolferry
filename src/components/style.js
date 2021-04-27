import React from "react";
import {StyleSheet, Dimensions} from 'react-native'

var height= Dimensions.get("window").height;
var width = Dimensions.get("window").width;
var fontScale = Dimensions.get("window").fontScale;

export default StyleSheet.create({
    //checklist.js
    container: {
      flex: 1,
      backgroundColor: '#FCFDDB',
    },
    sidehead: {
      fontWeight: 'bold',
      marginLeft: width * 0.02,
      alignSelf: 'flex-start',
      justifyContent: 'space-around',
      fontSize:16,
      marginTop:height * 0.01
    },
    pendingTrips: {
      backgroundColor: "#fff",
      height: 140,
      marginTop: 50,
      width: '90%',
      alignItems: "center",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: 10
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
      marginLeft: 30
    },
    subText: {
      alignSelf: "flex-start",
      marginLeft: 10,
      marginTop: 3,
    },
    inputViews: {
      height: 100,
      backgroundColor: "#D3D3D3",
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#FF5C00',
      width: '85%',
      alignSelf: "center", marginTop: 40,
      padding: 8,
  
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
    //endtripdetails.js
    firstbox1: {
        width: '90%',
        borderRadius: 10,
        padding: 8,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: 15,
    },
    loginBtn: {
        width: width * 0.5,
        height: height * 0.05,
        borderRadius: 10,       
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF5C00",
        alignSelf: "center",
        marginVertical: height * 0.01,
    },
    logoutBtn: {
      width: width * 0.5,
      height: height * 0.05,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#212121",
      alignSelf: "center",
      marginVertical: height * 0.02,
  },
    textHeads: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 5
    },
    detailsBox: {
        flex: 1,
        marginTop: 5,
        alignItems: 'flex-start',

    },
    textDetails: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 2,
    },
    childcard: {
        backgroundColor: '#32cd32',
        borderRadius: 10,
        borderWidth: 0.5,
        marginBottom: 5,
        marginRight: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height: 70,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 10,
            height: 10
        }
    },
    itemText: {
        fontSize: 18,
        fontWeight: '600'

    },
    modalContainer: {
        backgroundColor: '#00000080',
        flex: 1,
        justifyContent: 'center'
    },
    modalBody: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '92%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding:15
    },
    message: {
        fontSize: 27,
        textAlign: 'center',
        marginTop: 15,
        color: '#000',
        fontWeight: '600'
    },
    newsText: {
        fontSize: 23,
        padding: 2,
        color: '#000000aa',
        padding: 5,
        marginLeft: 10,
        fontWeight: '600'
    },

    closeModal: {
        borderRadius: 10,
        width: width * 0.45,
        height: height * 0.05,
        marginTop: 40,
        backgroundColor: '#FF5C00',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    absent: {
        alignSelf: 'flex-end',
        marginRight:10,
        fontSize: 15,
        color: 'red',
    },
    //homepage.js
      tripsTitleText: {
        fontSize: 25,
        marginTop: 10,
        fontWeight: "bold"
      },
      startTripText1: {
        fontSize: 22,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 10,
        color:'black',
      },
      tripBox: {
        flex: 1,
        marginTop: 20,
        marginBottom:5,
    
      },
      Text: {
        margin: 4,
        fontSize: 18,
        alignSelf: "center"
    
      },
      startTripText: {
        fontSize: 22,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 10,
        color:'black',
      },
      CallBtn: {
        width: "80%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FF5C00',
        alignSelf: 'center',
        marginBottom: 50,
      },
      loginText: {
        fontSize: fontScale*14,
        color:'white'   
      },
      card: {
        width: '80%',
        alignSelf: 'center',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
      },
      card2: {
        width: '80%',
        alignSelf: 'center',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'lightgrey',
        marginTop:10,
      },
    //map.js
      big: {
        fontSize: 48
      },
      //notstarted.js
      centerview: {
        color:'black',
        justifyContent:'center',
        alignSelf:'center'
      },
      //profile.js
      edit: {
        flexDirection: 'row-reverse',
        height: height * 0.05,
        width: width * 0.2,
        backgroundColor: '#FF5C00',
        alignSelf: 'flex-end',
        marginTop: height * 0.015,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
      name: {
        fontSize: 20,
        color: "black",
        fontWeight: '700',
    
      },
      details: {
        backgroundColor: "#d3d3d3",
        borderRadius: 12,
        width: width * 0.85,
        padding: 8,
        alignSelf: "center",
        flexWrap:'wrap'
      },
      //tripdetails.js
    disableBtn: {
        width: "50%",
        borderRadius: 10,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgrey",
        alignSelf: "center",
        marginVertical: 10,
    },
      text1: {
        fontSize: 16,
        color:'black',
        alignSelf: 'center',
        marginTop:height * 0.03,
        justifyContent:'center'
      },
      error: {
        color: '#DC143C',
        fontSize: fontScale* 13,
        alignSelf: 'center',
        marginTop: height * 0.01
      },
      TextInput: {
        borderWidth: 1,
        borderColor: '#FF5C00',
        borderRadius: 10,
        width: width * 0.8,
        height: height * 0.06,
        alignSelf: "center",
        textAlign:'center',
        backgroundColor: "#fff",
        marginTop: height * 0.02,
      },
    //notification.js'
  notice: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    padding: 7,
  },
  modalheading: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
    fontWeight: '700',
    padding: 7,
  },
  //childlist.js
  list:{
    flex:1,
    justifyContent:'center',
    padding:20,
    backgroundColor:"#FFF",
  },
  icon1: {
    marginLeft: 100,
  },
map: {
    height: height * 0.62,
},
note:{
    fontSize:14,
    marginHorizontal:5,
    color:'grey',
    marginTop: height * 0.008

},
//notriporsub.js
  centerview1: {
    justifyContent: 'center',
    marginVertical: 10,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal:width * 0.01,
  },
  body: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: fontScale*17,
    fontWeight: '700',
  },
  mainHeading: {
    fontSize: fontScale* 19,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  bodyView: {
    borderWidth: 0.8,
    padding:3
  },
  trackVehicle: {
    width: width * 0.45,
    height: height * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5C00',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 5,
  },
  disabled: {
    width: width * 0.45,
    height: height * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a9a9a9',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 5,
  },
  //addsubscription.js

  content:{
    marginLeft:width* 0.02,
    justifyContent:'space-around',
    marginVertical:height * 0.005,
    fontSize:14,
    marginRight: width* 0.004
  },
  slogans:{
      borderWidth: 1,
      borderColor: '#FF5C00',
      borderRadius: 10,
      width: width * 0.85,
      height: height * 0.66,
      padding:2,
      backgroundColor:'#fff',
      marginTop:height* 0.02,

  },
  body1: {
    justifyContent:'center',
    alignContent:'center',
    alignItems: 'center',
  },
  //support.js
  mailBtn: {
    width: width * 0.8,
    height: height * 0.05,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5C00",
    alignSelf: "center",
},
//profile.js
body2: {
  marginVertical: 23,
  alignSelf: 'center',
},
textview: {
  marginBottom: height * 0.01,
},
headertext: {
  fontSize: fontScale * 14,
  marginLeft: width * 0.09,
  color:'black',
  marginBottom: height * 0.003
},
//showplans.js
firstBox: {
  height: height * 0.04,
  flexDirection: 'row',
  marginTop: height*0.01,
  width: width,
  justifyContent:'space-between'
},
planTitleText: {
  fontSize: fontScale* 19,
  fontWeight: '700',
  marginLeft: width*0.04,
},
flatlist: {
  flex: 1,
  marginTop: 15,
  height: height * 0.2,
  width:width * 0.95,
  alignSelf:'center'
},
flatlistContainer: {
  flex: 1,
  width: width * 0.55,
  borderWidth: 1,
  borderRadius: 10,
  marginHorizontal: 5,
  backgroundColor: '#FF8A00',
},
avatar: {
  width: '100%',
  height: '53%',
  borderRadius:10
},
typeOfSubscription: {
  fontSize: 19,
  fontWeight: '700',
  alignSelf: 'center',
  marginTop: 2,
  marginBottom:5,
  color:'white'
},
serviceDetails: {
  fontSize: 17,
  fontWeight: '700',
  marginLeft: 10,
  color:'white'
},
price: {
  alignSelf: 'center',
  fontSize: 17,
  fontWeight: '700',
  color:'white'
},
totalText: {
  fontSize: 20,
  fontWeight: '700',
  marginLeft: 10,
  color:'white'
},
totalCost: {
  fontSize: 20,
  fontWeight: '700',
  color:'white'
},
randomText: {
  marginLeft:13,
  fontSize: 15,
  fontWeight: '700',
  color: '#000',
  marginVertical: 5,
},
addChildContainer: {
  borderWidth: 0.8,
  borderRadius: 10,
  marginTop: 10,
  width: width * 0.9,
  alignSelf: 'center',
  backgroundColor: '#fff',
  padding:height * 0.01
},
addChildText: {
  fontSize: fontScale* 16,
  fontWeight: '700',
  padding: 6,
  color:'#000'

},
unsubscribeBtn: {
  width: width * 0.75,
  height: height * 0.05,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FF5C00',
  alignSelf: 'center',
  marginTop: 20,
},
message1: {
  fontSize: 22,
  textAlign: 'center',
  color: '#000',
  fontWeight: '600',
  padding: 7,
},
randomText2: {
  fontSize: fontScale*17,
  fontWeight: '700',
  color: '#4169e1',
  marginVertical: 8,
  textAlign: 'center',
  marginHorizontal: 5,
},
//addingchild.js
TextInput1: {
  flex: 1,
  borderRadius: 12, 
  padding: 8,
  alignSelf: "center"
},
inputaddress: {
  borderWidth: 1,
  borderColor: '#FF5C00',
  borderRadius: 10,
  width: "80%",
  height: 45,
  padding: 2,
  backgroundColor: "#fff",  
  marginTop: 15,
  alignSelf:'center'
},
Picker1: {
  width: width * 0.7,
  height:height * 0.05,
  marginTop: height * 0.01,
  alignContent: "center",
  alignSelf: "center",
},
pickerBtn:{
  width: width* 0.380,
  height: height * 0.06,
  borderRadius: 10,
  borderWidth:1,
  borderColor:'#FF5C00',  
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  alignSelf: "center",
  marginTop: height * 0.02,

},
dobText:{
  padding:8, 
  alignSelf:'center',
},
bg1:{
  color:'#000'
},
bg2:{
  color:'#929292'
},
serviceText:{
  color:'#ce1212',
  fontSize:fontScale * 14,
  margin:height *0.02,
  textAlign:'center'
},
//locations.js
scrollview: {
  backgroundColor: '#FCFDDB',
  flex: 1,
  padding: 24,
},
TextInput3: {
  marginTop: 13,
  paddingLeft: 14,
  height: 47,
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 5,
  fontSize: 15,
},
submitBtn: {
  width: '65%',
  borderRadius: 10,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#ff5c8d',
  marginVertical: 20,
},
TextBtn: {
  fontSize: 15,
},
modalContainer1: {
  backgroundColor: '#00000080',
  flex: 1,
  height: height * 0.5,
  justifyContent: 'center',
},
modalBody1: {
  backgroundColor: '#fff',
  borderRadius: 10,
  height: height * 0.35,
  width: width * 0.88,
  alignSelf: 'center',
  justifyContent: 'center',
},
message2: {
  fontSize: 22,
  textAlign: 'center',
  color: '#FF5C00',
  fontWeight: '600',
},
newsText1: {
  fontSize: 17,
  textAlign: 'center',
  marginTop: 15,
  padding: 3,
  color: 'green',
},
//subhome.js
trips: {
  height: height * 0.055,
  width: width * 0.9,
  backgroundColor: 'white', 
  alignSelf: 'center',
  marginVertical: height * 0.01,
  flexDirection:'row',
  borderWidth:0.5,
  justifyContent:'space-between'
},
Picker: {
  width: width * 0.35,
  height: height * 0.04,
  alignSelf: 'flex-end',
},
//pauseplan.js
pausePlan: {
  borderWidth: 0.8,
  borderRadius: 10,
  marginTop: 20,
  height: height * 0.150,
  width: width * 0.85,
  alignSelf: 'center',
  backgroundColor: 'white',
},
biggerBox: {
  borderWidth: 0.8,
  borderRadius: 10,
  marginTop: 20,
  height: height * 0.220,
  width: width * 0.85,
  alignSelf: 'center',
  backgroundColor: 'white',
},
mainHeading1: {
  fontSize: fontScale * 18,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: height * 0.01,
},
heading: {
  fontSize: fontScale * 16,
  marginTop: 4,
  marginLeft: 10,
},

//paymode.js
PendingTrips: {
  backgroundColor: "#fff",
  height: 60,
  marginTop: 50,
  width: '90%',
  alignItems: "center",
  alignSelf: "center",
  borderWidth: 1,
  borderRadius: 10
},
payicon: {
  width: 70,
  height: 70,
  borderRadius: 63,
  borderWidth: 1,
  borderColor: "black",
  alignSelf: 'center',
  position: 'absolute',
  justifyContent: 'flex-start',
  marginTop: 50
},
card1: {
  width: '90%',
  alignSelf: 'center',
  height: 100,
  alignItems: 'center',
  justifyContent: 'center',
},
driverchild: {
  width: '75%',
  alignSelf: 'center',
  height: 100,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:20,
},
nannychild: {
  width: '85%',
  alignSelf: 'center',
  height: 100,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:20,
},
//plandetails.js
headertext1: {
  fontSize: 13,
  marginLeft: 40,
  marginTop:10,
  fontWeight:'700'
},
inputView1: {
  padding: 10,
  borderWidth: 1,
  borderColor: '#FF5C00',
  borderRadius: 10,
  width: width * 0.8,
  flexWrap:'wrap',
  alignSelf: "center",
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: "#fff", 
  marginTop: 15,
},
//upipay.js
inputView: {
  borderWidth: 1,
  borderColor: '#FF5C00',
  borderRadius: 10,
  width: width * 0.8,
  height: height * 0.06,
  alignSelf: "center",
  alignItems:'center',
  textAlign:'center',
  backgroundColor: "#fff",
  marginTop: height * 0.02,
},
//login.js
cont2:{
  flex: 1,
  backgroundColor: '#FCFDDB',
  alignItems: 'center',
  justifyContent: 'center',
},
image: {
  marginBottom: 10,
},
forgot_button: {
  fontSize:fontScale *14,
  color: '#1E90FF',
  marginBottom:height * 0.01
},
registerTextStyle: {
 marginTop: height * 0.01,
  color:'black',
  fontSize: fontScale * 13,
},
//forgotpassword.js
text: {
  marginTop: height * 0.160,
  alignSelf:'center',
  fontSize: fontScale*15,
  marginHorizontal:width * 0.01,
},
//otpscreen.js
otpBox: {
  padding: 10,
  marginRight: 10,
  borderWidth: 1,
  fontSize: 25,
  borderColor: 'lightgrey',
  height: 50,
  width: 50,
  textAlign: 'center'
},
otpBoxesContainer: {
  flexDirection: 'row'
},
//profile.js
licence: {
  marginTop:20,
  height: 100,
  width: 100,
  borderRadius:50,
  alignSelf: 'center'
  },
  idproof:{
    width:"85%",
    height:170,
    alignSelf:'center'
  },
  inputView2: {
    borderWidth: 1,
    borderColor: '#FF5C00',
    borderRadius: 10,
    width: "80%",
    height: 45,
    alignSelf: "center",
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#fff",   
    marginTop: 5,
  },
// parent trip details
  tripDetailsCard:{
    width: width * 0.95,
    alignSelf: 'center',
    marginTop: 20
  },
  headingText:{
    fontSize: fontScale*17,
     fontWeight: '700'
  },
  tripdetailsSubHeading:{
    fontSize: fontScale *14
  },
  subDetails:{
    fontSize: fontScale *14,
    marginLeft: 10,
    fontWeight: '700',
  },
  tripdDetailsImage:{
    height:height * 0.160,
    width:width * 0.27,
    borderRadius:10,
    alignSelf:'center',
  },
  detailsBox:{
    flex:1,
    alignSelf:'center', 
    marginLeft:20
  },
  //profile.js
  modalContainer3: {
    backgroundColor: '#00000080',
    flex: 1,
    height: '50%',
    justifyContent: 'flex-end',
  },
  modalBody3: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 280,
    width: '88%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileView:{
    width:width *0.27,
    height:height *0.160,
    alignSelf:'center',
    marginTop:15,
    borderRadius:50
    
  },
  //tripdetails.js
  licence1: {
    marginTop:5,
    marginBottom:15,
    height: 140,
    width: 140,
    borderRadius:140,
    alignSelf: 'center'
    },
    logoImage:{
      width: width * 0.7,
      height: height * 0.25,
      marginBottom: 20
    },
    mailSupportText: {
      fontSize: fontScale * 17,
      textAlign: 'center',
      marginHorizontal:width * 0.04,
      marginBottom:10,
      },
    busstarted:{
      height:110,
      width:180,
      alignSelf:'center'
    },
    startTripText2: {
      fontSize: 22,
      textAlign: "center",
      marginTop: 30,
      fontWeight:'bold',
      marginBottom: 10,
      color:'black',
    },
    })
    
