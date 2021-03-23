import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Ngrok from '../../constants/ngrok';
import axios from 'axios';

const MyPieChart = () => {
  const [data,setData]=useState();
  const [isLoading,setisload]=useState(true);
  const [hist, setHist] = useState([10,18,8,20, 25]);
  const months= ['Parents','TotalChild','SubChild','UnSubChild',];
  const [emphist, setEmpHist] = useState([10,18,8,20, 25]);
  const [emp,setEmp]= useState([]);
  useEffect(() => {
      axios
        .get(`${Ngrok.url}/api/management/piechart`)
        .then(function (response) {
          setData(response.data);
          setisload(false);
        })
        .catch(function (error) {
          // handle error
          console.log("error",error.message);
        })
        .finally(function () {
          // always executed
        });
        axios
    .get(`${Ngrok.url}/api/management/usersreport`)
    .then(function (response) {
      setHist(response.data.usersVal);
      setEmpHist(response.data.employeesVals);
      setEmp(response.data.employees);
      //setmonths(response.data.users)
      //setisload(false);
    })
    .catch(function (error) {
      // handle error
      console.log("error",error.message);
    })
    .finally(function () {
      // always executed
    });
      },[]);
      
    // const prog = {
    //   labels: ["Swim", "Bike", "Run"], // optional
    //   data: [0.4, 0.7, 0.8]
    // };
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="#e91e63"
        //Background color of statusBar only works for Android
        translucent={false}
      //allowing light, but not detailed shapes

      />
    <ScrollView>
      <Text style={styles.header}>SUBSCRIPTION STATS</Text>
      {/* style={{alignSelf:'flex-start'}} */}
      {isLoading ? <ActivityIndicator/>:<View >
        {/* <ProgressChart
  data={prog}
  width={400}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    //decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  hideLegend={false}
/> */}
        <PieChart
        data={[
          {
            name: '[Subscribed]',
            population:data.subscribedUsers,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: 'black',
            legendFontSize: 12,
          },
          {
            name: '[Registered]',
            population: data.unSubscribedUsers,
            color: '#F00',
            legendFontColor: 'black',
            legendFontSize: 12,
          },
          // {
          //   name: '[No Child Added]',
          //   population: data.noChildAdded,
          //   color: 'lightgreen',
          //   legendFontColor: 'black',
          //   legendFontSize: 12,
          // },
        ]}
        width={Dimensions.get('window').width -30}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          //decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute //For the absolute number else percentage
      />
      <Text style={styles.header}>USERS STATS</Text>
      <BarChart
        data={{
          labels: months,
          datasets: [
            {
              data: hist,
            },
          ],
        }}
        fromZero
        width={Dimensions.get('window').width -30}
        height={220}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1CC910',
          backgroundGradientFrom: 'lightblue',//'rgb(12, 99, 250)',//'#EFF3FF',
          backgroundGradientTo: 'white',//'rgb(39, 143, 255)',//'#EFEFEF',
          decimalPlaces: 0,
          barPercentage:1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginLeft:10,
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={styles.header}>EMPLOYEE STATS</Text>
      <BarChart
        data={{
          labels: emp,
          datasets: [
            {
              data: emphist,
            },
          ],
        }}
        fromZero
        width={Dimensions.get('window').width -30}
        height={220}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1CC910',
          backgroundGradientFrom: 'lightblue',//'rgb(12, 99, 250)',//'#EFF3FF',
          backgroundGradientTo: 'white',//'rgb(39, 143, 255)',//'#EFEFEF',
          decimalPlaces: 0,
          barPercentage:1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginLeft:10,
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      </View>}

    </ScrollView>
    </View>
  );
};

export default MyPieChart;
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: "#F9F2F2",
    alignItems: "center",
  },
  histBtn: {
    width: "20%",
    borderRadius: 10,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: "#ff5c8d",
    marginHorizontal:"2%"
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});



