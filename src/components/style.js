import React from "react";
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    //checklist.js
    container: {
      flex: 1,
      backgroundColor: '#FCFDDB',//"#B19CD1",//"#F9F2F2",
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
    inputView: {
      borderWidth: 1,
      borderColor: '#FF5C00',
      borderRadius: 10,
      width: "80%",
      height: 45,
      alignSelf: "center",
      alignItems:'center',
      backgroundColor: "#fff",   //"#C4C4C4",
      marginTop: 20,
      //opacity: 0.5,
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
      //marginTop: 3,
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
    // firstbox: {
    //     width: '90%',
    //     //flexDirection:'row',
    //     borderRadius: 10,
    //     padding: 8,
    //     borderWidth: 2,
    //     borderColor: 'black',
    //     backgroundColor: '#fff',
    //     alignSelf: 'center',
    //     marginVertical: 15,
    // },
    loginBtn: {
        width: "50%",
        borderRadius: 10,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF5C00",//'#72CDF4',////"#ff5c8d",
        alignSelf: "center",
        marginVertical: 10,
    },
    logoutBtn: {
      width: "50%",
      borderRadius: 10,
      height: 38,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#212121",
      alignSelf: "center",
      marginTop: 10,
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
        backgroundColor: '#000000aa',
        flex: 1,
        //height: '50%',
        justifyContent: 'center'
    },
    modalBody: {
        backgroundColor: '#fff',
        borderRadius: 10,
        //height: 370,
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
        marginRight:10,
        fontSize: 15,
        //marginTop:10,
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
        backgroundColor: '#FF5C00',//"#32cd32",
        alignSelf: 'center',
        marginBottom: 50,
      },
      loginText: {
        fontSize: 15,
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
        height: 35,
        backgroundColor: '#FF5C00',
        width: 70,
        alignSelf: 'flex-end',
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor:'black',
        borderRadius: 12,
      },
      name: {
        fontSize: 22,
        color: "black",
        fontWeight: '600',
    
      },
      details: {
        backgroundColor: "#d3d3d3",
        borderRadius: 12,
        width: '85%',
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
    //triphistory.js (Nothing)
    //updateprofile.js (check main view background color)
      text: {
        fontSize: 18,
        color:'black',
        alignSelf: 'center',
        marginBottom: 10,
        justifyContent:'center'
      },
      error: {
        color: '#DC143C',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 5
      },
      TextInput: {
        height: 50,
        flex: 1,
        alignContent:'center',
        alignItems: 'center',
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
  //nanny interface
  //changepwd.js
  cont:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#FCFDDB',//'#263165'
    },
  //childdetails.js

//   textview: {
//     margin: 20,
//   },
  //childlist.js
  list:{
    flex:1,
    justifyContent:'center',
    //marginVertical:10,
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
    height: '70%',
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
    alignSelf: 'center',
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 3,
  },
  body: {
    marginVertical: 40,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 19,
    fontWeight: '700',
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  bodyView: {
    // borderRadius: 10,
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
    backgroundColor: '#ff5c8d',
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
      borderColor: '#b0003a',
      borderRadius: 10,
      width: "85%",
      height: 490,
      padding:2,
      backgroundColor:'#ffe4e1',   //"#C4C4C4",
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
  fontSize: 16,
  marginLeft: 30,
  color:'black',
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
  fontSize: 23,
  fontWeight: '700',
  marginLeft: 10,
},
flatlist: {
  flex: 1,
  marginTop: 15,
  height: 150,
},
flatlistContainer: {
  flex: 1,
  width: 220,
  borderWidth: 1,
  borderRadius: 10,
  marginHorizontal: 10,
  backgroundColor: '#FF8A00',
  marginBottom: 5,
},
avatar: {
  width: '100%',
  height: '50%',
  borderRadius:10
},
typeOfSubscription: {
  fontSize: 22,
  fontWeight: '700',
  alignSelf: 'center',
  marginTop: 2,
  color:'black'
},
serviceDetails: {
  fontSize: 18,
  fontWeight: '700',
  marginLeft: 10,
  color:'black'
},
price: {
  alignSelf: 'center',
  fontSize: 18,
  fontWeight: '700',
  color:'black'
},
totalText: {
  fontSize: 22,
  fontWeight: '700',
  marginLeft: 10,
  color:'black'
},
totalCost: {
  fontSize: 22,
  fontWeight: '700',
  color:'black'
},
randomText: {
  //marginTop: 5,
  fontSize: 15,
  alignSelf: 'center',
  fontWeight: '700',
  color: '#ce1212',
  marginVertical: 5,
},
addChildContainer: {
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 10,
  height: 130,
  width: '90%',
  alignSelf: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},
addChildText: {
  fontSize: 17,
  fontWeight: '700',
  padding: 10,
  textAlign: 'center',
},
unsubscribeBtn: {
  width: '75%',
  borderRadius: 10,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FF5C00',
  alignSelf: 'center',
  marginTop: 10,
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
  fontSize: 19,
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
  borderColor: '#B0003A',
  borderRadius: 10,
  width: "80%",
  height: 45,
  padding: 2,
  backgroundColor: "#fff",   //"#C4C4C4",
  marginTop: 7,
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
  borderColor:'#B0003A',
  height: 45,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  alignSelf: "center",
  marginTop: 10,

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
  fontSize:16,
  marginTop:15,
  marginLeft:10,
  //marginRight:5,
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
  width: '95%',
  marginTop: 5,
  alignSelf: 'center',
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
  height: 110,
  width: '85%',
  alignSelf: 'center',
  //alignItems: 'center',
  backgroundColor: 'white',
},
biggerBox: {
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 20,
  height: 160,
  width: '85%',
  alignSelf: 'center',
  //alignItems: 'center',
  backgroundColor: 'white',
},
mainHeading1: {
  fontSize: 20,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: 5,
},
heading: {
  fontSize: 18,
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
  width: 70,
  height: 70,
  borderRadius: 63,
  borderWidth: 1,
  borderColor: "black",
  //marginBottom: 10,
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
//plandetails.js
headertext1: {
  fontSize: 13,
  marginLeft: 40,
},
inputView1: {
  padding: 10,
  borderWidth: 1,
  borderColor: '#FF5C00',
  borderRadius: 10,
  width: "80%",
  height: 45,
  flexWrap:'wrap',
  alignSelf: "center",
  alignItems:'center',
  justifyContent:'center',
  backgroundColor: "#fff",   //"#C4C4C4",
  marginTop: 5,
  //opacity: 0.5,
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
  marginTop: 5,
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
    })
    