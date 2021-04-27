import React from "react";
import {StyleSheet,Dimensions} from 'react-native'

var height= Dimensions.get("window").height;
var width = Dimensions.get("window").width;
var fontScale = Dimensions.get("window").fontScale;

export default StyleSheet.create({
    //checklist.js
    container: {
      flex: 1,
      backgroundColor: '#FCFDDB',
    },
    cont: {
      flex: 1,
      backgroundColor: '#FCFDDB',
      justifyContent:'center'
    },
    sidehead: {
      fontWeight: 'bold',
      marginLeft: 8,
      alignSelf: 'flex-start',
      justifyContent: 'space-around',
      fontSize:18
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
      marginBottom: height*0.03,
      marginLeft: width*0.09,
      alignItems:'center'
    },
    datestyle:{
      alignSelf:'center',
      fontSize:fontScale*15
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
    label: {
      margin: width*0.02,
      fontSize:fontScale*15
    },
    //endtripdetails.js
    headingcontainer: {
        width: width*0.9,
        borderRadius: height*0.02,
        padding: height*0.01,
        borderWidth: height*0.003,
        borderColor: 'black',
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: height*0.015,
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
        fontSize: fontScale*18,
        fontWeight: 'bold',
        marginTop: height*0.005,
    },
    textDetails: {
        fontSize: fontScale*18,
        fontWeight: '600',
        marginVertical:  height*0.005,
    },
    childcard: {
        backgroundColor: '#32cd32',
        borderRadius: 10,
        borderWidth: 0.5,
        marginBottom: 5,
        marginRight: 15,
        //backgroundColor: '#fff',
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
        width: "50%",
        height: 40,
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
        marginRight:width*0.02,
        fontSize: fontScale*15,
        color: 'red',
        marginBottom:height*0.01
    },
    //homepage.js
    tripendedtext:{
      color:'white',
      fontWeight:'700',
      fontSize:fontScale*17 
    },
    tripstartedtext:{
      color: 'black',
      fontWeight: '700',
      fontSize: fontScale*17 
    },
      tripsTitleText: {
        fontSize: fontScale*25,
        marginTop: height*0.013,
        fontWeight: "bold",
        alignSelf:'center'
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
        fontSize: fontScale*22,
        textAlign: "center",
        marginTop: height*0.04,
        marginBottom: height*0.01,
        color:'black',
      },
      CallBtn: {
        width: width*0.8,
        borderRadius: width*0.03,
        height: height*0.05,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FF5C00',
        alignSelf: 'center',
        marginBottom: height*0.04,
      },
      loginText: {
        fontSize: fontScale*15,
        color:'white'
    
      },
      card: {
        width: width*0.8,
        alignSelf: 'center',
        height: height*0.08,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:height*0.01,
      },
      card2: {
        width: width*0.8,
        alignSelf: 'center',
        height: height*0.08,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'lightgrey',
        marginTop:height*0.01,
      },
    //map.js
      big: {
        fontSize: fontScale*40,
        alignSelf:'center'
      },
      mapstyle:{
        height:height*0.78,
        width:width*1,
      },
      //notstarted.js
      centerview: {
        color:'black',
        justifyContent:'center',
        alignSelf:'center',
        fontSize:fontScale*17,
        marginBottom:height*0.015
      },
      //profile.js
      edit: {
        flexDirection: 'row-reverse',
        height: height*0.035,
        backgroundColor: '#FF5C00',
        width: width*0.2,
        alignSelf: 'flex-end',
        marginTop: height*0.01,
        marginHorizontal: width*0.075,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width*0.025,
      },
      name: {
        fontSize: fontScale*22,
        color: "black",
        fontWeight: '700',    
      },
      details: {
        backgroundColor: "#d3d3d3",
        borderRadius: height*0.015,
        width: width*0.85,
        padding: height*0.012,
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
    switchstyle:{
      marginLeft:width*0.025
    },
    //triphistory.js (Nothing)
    //updateprofile.js (check main view background color)
      text1: {
        fontSize: 18,
        color:'black',
        alignSelf: 'center',
        marginTop:20,
        marginBottom: 10,
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
        alignItems:'center',
        textAlign:'center',
        backgroundColor: "#fff",
        marginTop: height * 0.02,
      },
    //notification.js'
  notice: {
    fontSize: fontScale*22,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    padding: height*0.005,
  },
  modalheading: {
    fontSize: fontScale*22,
    textAlign: 'center',
    marginBottom:height*0.005,
    color: '#000',
    fontWeight: '700',
    padding: height*0.005,
  },
  //nanny interface
  //childlist.js
  list:{
    flex:1,
    justifyContent:'center',
    padding:20,
    backgroundColor:"#FFF",
  },
  //tripdetails.js(Nothing)
  //oldchilddetails.js (Nothing)
  //endtrips.js (Nothing)
  //history.js
  icon1: {
    marginLeft: 100,
  },
  //nannyhome.js(Nothing)
  //profile.js(Nothing)
  //updatenannypro.js(Nothing)

  //parent module
  //unsubscribedhome.js
map: {
    height: '75%',
},
note:{
    fontSize:16,
    marginHorizontal:5,
    //textAlign:'center',
    color:'grey'
},
//notriporsub.js
  centerview1: {
    justifyContent: 'center',
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 3,
   //paddingHorizontal:5,
  },
  body: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  bodyView: {
    borderWidth: 1,
    width: '100%',
    padding: 5,
  },
  trackVehicle: {
    width: '50%',
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5C00',
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 5,
  },
  disabled: {
    width: '50%',
    height: 38,
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
    marginLeft:13,
    alignSelf:'flex-start',
    justifyContent:'space-around',
    marginVertical:2,
    fontSize:15

  },
  slogans:{
      borderWidth: 1,
      borderColor: '#FF5C00',
      borderRadius: 10,
      width: "85%",
      height: 490,
      padding:2,
      backgroundColor:'#fff',   //"#C4C4C4",
      marginVertical: 5,

  },
  body1: {
    justifyContent:'center',
    alignContent:'center',
    alignItems: 'center',
  },
  //support.js
  mailBtn: {
    width: "80%",
    borderRadius: 10,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5C00",
    alignSelf: "center",
    marginVertical: 10,
},
//profile.js
body2: {
  marginVertical: 23,
  alignSelf: 'center',
},
textview: {
  marginBottom: 7,
},
headertext: {
  fontSize: fontScale*16,
  marginLeft: width*0.075,
  color:'black',
  marginTop:height*0.005
},
//updateprofile.js(Nothing)
//showplans.js
firstBox: {
  height: 32,
  flexDirection: 'row',
  marginTop: 10,
  width: '100%',
  justifyContent:'space-between'
},
planTitleText: {
  fontSize: 20,
  fontWeight: '700',
  marginLeft: 14,
},
flatlist: {
  flex: 1,
  marginTop: 15,
  height: 150,
  width:'95%',
  alignSelf:'center'
},
flatlistContainer: {
  flex: 1,
  width: 220,
  borderWidth: 1,
  borderRadius: 10,
  marginHorizontal: 5,
  backgroundColor: '#FF8A00',
  marginBottom: 5,
},
avatar: {
  width: '100%',
  height: '50%',
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
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 10,
  width: '90%',
  alignSelf: 'center',
  backgroundColor: '#fff',
},
addChildText: {
  fontSize: 17,
  fontWeight: '700',
  padding: 6,
 color:'#000'
},
unsubscribeBtn: {
  width: '75%',
  borderRadius: 10,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FF5C00',
  alignSelf: 'center',
  marginTop: 20,
},
message1: {
  fontSize: 22,
  textAlign: 'center',
  //marginTop: 30
  color: '#000',
  fontWeight: '600',
  padding: 7,
},
randomText2: {
  fontSize: 17,
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
  backgroundColor: "#fff",   //"#C4C4C4",
  marginTop: 15,
  alignSelf:'center'
},
Picker1: {
  width: "70%",
  marginTop: 7,
  borderRadius: 10,
  height: 45,
  borderWidth: 2,
  alignContent: "center",
  alignSelf: "center",
},
pickerBtn:{
  width: 150,
  borderRadius: 10,
  borderWidth:1,
  borderColor:'#FF5C00',
  height: 45,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  alignSelf: "center",
  marginTop: 15,

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
  fontSize:14,
  marginTop:10,
  marginHorizontal:5,
  marginBottom:10,
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
  height: '50%',
  justifyContent: 'center',
},
modalBody1: {
  backgroundColor: '#fff',
  borderRadius: 10,
  height: 280,
  width: '88%',
  alignSelf: 'center',
  justifyContent: 'center',
},
message2: {
  fontSize: 26,
  textAlign: 'center',
  //marginTop: 30
  color: '#FF5C00',
  fontWeight: '600',
},
newsText1: {
  fontSize: 19,
  textAlign: 'center',
  marginTop: 15,
  padding: 2,
  color: 'green',
},
//subhome.js
trips: {
  height: 40,
  backgroundColor: 'white',
  width: '90%',
  marginTop: 5,
  alignSelf: 'center',
  marginBottom:10,
  flexDirection:'row',
  borderWidth:0.5,
  justifyContent:'space-between'
},
Picker: {
  width: '35%',
  height: 30,
  alignSelf: 'flex-end',
},
//pauseplan.js
pausePlan: {
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 20,
  height: 100,
  width: '85%',
  alignSelf: 'center',
  backgroundColor: 'white',
},
biggerBox: {
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 20,
  height: 150,
  width: '85%',
  alignSelf: 'center',
  backgroundColor: 'white',
},
mainHeading1: {
  fontSize: 19,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: 5,
},
heading: {
  fontSize: 16,
  marginTop: 4,
  marginLeft: 10,
},
//child_Details.js(Nothing)
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
  width: width*0.18,
  height: width*0.18,
  borderRadius: width*0.18,
  borderWidth: 1,
  borderColor: "black",
  alignSelf: 'center',
  position: 'absolute',
  justifyContent: 'flex-start',
},
card1: {
  width: '90%',
  alignSelf: 'center',
  height: 100,
  alignItems: 'center',
  justifyContent: 'center',
},
driverchild: {
  width: width*0.75,
  alignSelf: 'center',
  height: height*0.125,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:width*0.07,
},
nannychild: {
  width: width*0.85,
  alignSelf: 'center',
  height: height*0.125,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:width*0.07,
},
childcardtext:{
  fontSize: 17,
  fontWeight: '700',
  marginLeft: width*0.25
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
  width: "80%",
  flexWrap:'wrap',
  alignSelf: "center",
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: "#fff",   //"#C4C4C4",
  marginTop: 15,
},
//upipay.js
inputView: {
  padding: 2,
  borderWidth: 1,
  borderColor: '#FF5C00',
  borderRadius: 10,
  width: "80%",
  height: 45,
  alignSelf: "center",
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: "#fff",   //"#C4C4C4",
  marginTop: 15,
  //opacity: 0.5,
},
//Screens
//login.js
cont2:{
  flex: 1,
  backgroundColor: '#FCFDDB',//'#24103A',
  alignItems: 'center',
  justifyContent: 'center',
},
image: {
  marginBottom: 10,
},
forgot_button: {
  height: 30,
  color: '#1E90FF',
},
registerTextStyle: {
  marginTop: 10,
  color:'black',
  fontSize: 13,
},
//forgotpassword.js
text: {
  marginTop: 100,
  alignSelf:'center',
  fontSize: 15,
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
  marginTop:height*0.02,
  height: height*0.15,
  width: height*0.15,
  borderRadius:height*0.15,
  alignSelf: 'center'
  },
  idproof:{
    width:width*0.85,
    height:height*0.25,
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
    backgroundColor: "#fff",   //"#C4C4C4",
    marginTop: 5,
    //opacity: 0.5,
  },
// parent trip details
  tripDetailsCard:{
    width: '95%',
    alignSelf: 'center',
    marginTop: 20
  },
  headingText:{
    fontSize: 17,
     fontWeight: '700'
  },
  tripdetailsSubHeading:{
    fontSize: 15
  },
  subDetails:{
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '700',
  },
  tripdDetailsImage:{
    height:130,
    width:120,
    borderRadius:10,
    alignSelf:'center',
  },
  detailsBox:{
    flex:1,
    alignSelf:'center', 
    marginLeft:width*0.05
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
    width:100,
    height:100,
    alignSelf:'center',
    marginTop:15,
    
  },
  //tripdetails.js
  licence1: {
    marginTop:height*0.01,
    marginBottom:height*0.015,
    height: height*0.175,
    width: height*0.175,
    borderRadius:height*0.175,
    alignSelf: 'center'
    },
    busstarted:{
      height:height*0.15,
      width:width*0.5,
      alignSelf:'center'
    },
    })
    
