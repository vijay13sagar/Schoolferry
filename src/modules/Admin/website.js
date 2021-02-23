import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default MyComponent;

// import React, { useState } from "react";
// import { CheckBox, Text, StyleSheet, View } from "react-native";
// import moment from 'moment';
// import { ScrollView } from "react-native-gesture-handler";
// const today = new Date();
// const TD = moment(today).format('DD-MM-YYYY');

// const App = () => {
//   const [fule, setfule] = useState(false);
//   const [engine, setengine] = useState(false);
//   const [firstaid, setfirstaid] = useState(false);
//   const [extinguisher, setextinguisher] = useState(false);
//   const [cleanliness, setcleanliness] = useState(false);
//   const [brake, setbrake] = useState(false);
//   const [tyre, settyre] = useState(false);

//   return (
//     <View style={styles.container}>
//              <Text style={{alignSelf:"center"}}>{TD}</Text> 
//              <ScrollView style={{alignSelf:"center",width:"100%"}}>
          
//       <View style={styles.pendingTrips}>
//       <Text style={{marginLeft:35,fontSize: 25,
//     marginTop: 10,
//     fontWeight: "bold"}}>Vehicle Details</Text>
//       <Text  style={styles.subText}>Vehicle Number :</Text>
//       <Text  style={styles.subText}>Vehicle Type :</Text>
//       <Text  style={styles.subText}>Vehicle Capacity :</Text>
      
//       </View>
//       <Text style={{fontSize:20,alignSelf:"center",marginTop:20,}}> Daily Routine Checklist</Text>
      
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={fule}
//           onValueChange={setfule}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Fuel Quantity</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={engine}
//           onValueChange={setengine}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Engine Condition</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={firstaid}
//           onValueChange={setfirstaid}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>First AID</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={extinguisher}
//           onValueChange={setextinguisher}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Extinguisher</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={cleanliness}
//           onValueChange={setcleanliness}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Cleanliness</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={brake}
//           onValueChange={setbrake}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Brakes</Text>
//       </View>
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={tyre}
//           onValueChange={settyre}
//           style={styles.checkbox}
//         />
//         <Text style={styles.label}>Tyre Pressure</Text>
//       </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems:"flex-start",
//     backgroundColor: "#F9F2F2",
   
//   },
//   pendingTrips: {
//     backgroundColor: "#fff",
//     height: 140,
//     marginTop: 50,
//     width: '90%',
//     alignItems: "center",
//     alignSelf: "center",
//     borderWidth: 1,
//     borderRadius: 10

//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     marginLeft:30
//   },
//   subText: {
//     alignSelf:"flex-start",
//     marginLeft:10,
//     marginTop: 3,
    
  

//   },
//   inputViews: {
     
//     height: 100,
//     backgroundColor: "#d3d3d3",
//     //borderWidth: 1,
//     borderRadius: 12,
//     //borderColor: '#ff5c8d',
//     //marginTop: 3,
//     width: '85%',
//     padding: 8,
//     alignSelf: "center"
//   },
//   checkbox: {
//     alignSelf: "center",
//   },
//   label: {
//     margin: 8,
//   },
// });

// export default App;