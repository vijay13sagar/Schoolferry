import React from "react";
import {StyleSheet, Dimensions} from 'react-native'
var height= Dimensions.get("window").height;
var width = Dimensions.get("window").width;
var fontScale = Dimensions.get("window").fontScale;
export default StyleSheet.create({
    container1: {
      flex:1,
        backgroundColor: "#FCFDDB",
      },
      container: {
        flex: 1,
        backgroundColor: "#FCFDDB",
        alignItems: "center",
        justifyContent: "center",
      },
      container2: {
        flex: 1,
        backgroundColor: "#FCFDDB",
        alignItems: "center",
      },
      container4: {
        flex: 1,
        backgroundColor: "#FCFDDB",
      },
     
     
        // message1: {
        // fontSize: 22,
        // textAlign: 'center',
        // //marginTop: 30
        // color: '#000',
        // fontWeight: '600',
        // padding: 7,
        // },
        
      histBtn: {
        width:width*0.2,
        borderRadius: 10,
        height:height*0.045,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: height*0.019,
        backgroundColor: "#FF5C00",
        marginHorizontal:width*0.02
      },
      header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom:height*0.015,
        marginTop:height*0.02,
      },
      loginBtn: {
        width:width*0.5,
        borderRadius: 10,
        height:height*0.05,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF5C00",
        alignSelf: "center",
        marginTop:height*0.02,
      },
     
     
      pendingTrips1: {
        backgroundColor: "#fff",
        height:height*0.12,
        marginTop: height*0.02,
        width: width*0.9,
        alignItems: "center",
        alignSelf: "center",
        borderWidth: 1,
        borderRadius: 10
      },
      logo: {
        marginVertical: height*0.025,
        width:width*0.7,
        height:height*0.3,
      },
      // pendingTrips: {
      //   backgroundColor: "#fff",
      //   height: 140,
      //   marginTop: 50,
      //   width: '90%',
      //   alignItems: "center",
      //   alignSelf: "center",
      //   borderWidth: 1,
      //   borderRadius: 10
    
      // },
      // Schedule: {
      //   width: "40%",
      //   borderRadius: 10,
      //   height: 38,
      //   alignItems:"center",
      //   justifyContent:"center",
      
      //   backgroundColor: "#ff5c8d",
      //   alignSelf:"center",
      //   marginTop: 20,
      // },
      // title: {
      //   position: 'absolute',
      //   marginTop: 65,
      //   marginBottom: 0,
      //   marginHorizontal: 20,
      //   fontSize: 30,
      //   color: 'white',
      //   fontWeight: 'bold'
      // }, 
      // time: {
      //   width: '20%',
      //   marginVertical: 20,
      //   position: 'absolute',
      //   backgroundColor: 'green',
      //   color: 'white',
      //   fontSize: 25,
      //   fontWeight: 'bold',
      //   bottom: 0,
      //   borderRadius: 20,
      //   marginLeft: 20
      // },
      
      inputView: {
        borderWidth: 1,
        borderColor: '#FF5C00',
        borderRadius: 10,
        width: width*0.9,
        height: height*0.06,
        alignItems: "center",
        backgroundColor: "#fff",   //"#C4C4C4",
        marginTop: height*0.015,
        //opacity: 0.5,
      },
      inputView1: {
        borderWidth: 1,
        borderColor: '#FF5C00',
        borderRadius: 10,
        width:width*0.8,
        height:height*0.06,
     alignSelf:"center",
        backgroundColor: "#fff",   //"#C4C4C4",
        marginTop:height*0.015,
        //opacity: 0.5,
      },
      loginBtns: {
        width: width*0.8,
        borderRadius: 10,
        height: height*0.06,
        alignItems: "center",
        justifyContent: "center",
        marginTop:height*0.03,
        backgroundColor: "#FF5C00",
      },
      
      card1: {
        width: width*0.9,
        alignSelf: 'center',
        height:height*0.125,
        alignItems: 'center',
        justifyContent: 'center',
      },
      payicon: {
        width:width*0.15,
        height:height*0.07,
        
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'flex-start',
        marginTop: 50
      },
      details: {
       
        backgroundColor: "#d3d3d3",
        borderRadius: 12,
        width:width*0.9,
        padding: height*0.015,
        marginTop: height*0.005,
        marginBottom: height*0.015,
        alignSelf: "center"
    
      },
      
      
     
      // inputViews: {
      //   borderWidth: 1,
      //   borderColor: '#FF5C00',
      //   borderRadius: 10,
      //   width: "80%",
      //   height: 100,
      //   alignItems: "center",
      //   backgroundColor: "#fff",   //"#C4C4C4",
      //   marginTop: 5,
      //   //opacity: 0.5,
      // },
     TextInput: {
        
        color:"white", 
        alignItems:"center",
        justifyContent:"center",
    
      },
      // TextInput1: {
      //   height: 50,
      //   color:"white", 
      //   alignItems: "flex-start",
      //   padding: 10,
      //   marginLeft: 10,
    
      // },
      TextInput3: {
        marginTop:10,
        color:"white", 
        alignSelf:"center"
    
      },
      TextInput4: {
        marginTop:height*0.01,
        marginBottom:height*0.01,
        color:"black", 
        alignSelf:"center"
    
      },
      TextInput2: {
        // height: height*0.04,
        color:"black", 
        alignSelf:"center",
        // padding: 10,
        // marginLeft:width*0.01,
    
      },
     
      // forgot_button: {
      //   height: 30,
      //   marginBottom: 15,
      //   color: '#1e90ff',
    
      // },
      error: {
        padding: 1,
    
        color: '#dc143c',
        fontSize: 11,
       alignSelf:"center"
      },

      container3: {
        flex: 1,
        backgroundColor: "#FCFDDB",
        },
        licence: {
        marginTop:height*0.02,
        height: height*0.35,
        width:  height*0.45,
        alignSelf: 'center'
        },
        licence1: {
          marginTop:height*0.02,
        height: height*0.2,
        width:  height*0.2,
          borderRadius:75,
          alignSelf: 'center'
          },
          licence2: {
            marginTop:height*0.02,
            height: height*0.175,
            width:  height*0.175,
           
            alignSelf: 'center'
            },
            licence3: {
              marginTop:height*0.02,
              height: height*0.05,
              width:  height*0.05,
              alignSelf: 'center'
              },
        modalContainer: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center'
        },
        modalBody1: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: height*0.4,
        width: width*0.88,
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
        // card2: {
        //   backgroundColor:'lightgrey',
        //   width: "50%",
        //   borderRadius: 10,
        //   height: 38,
        //   alignItems: "center",
        //   justifyContent: "center",
         
        //   alignSelf: "center",
        //   marginTop: 20,
        // },
      

    })