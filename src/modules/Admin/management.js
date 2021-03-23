import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
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
  const [months,setmonths]= useState(['January','February','March','April','May',]);
  useEffect(() => {
      CallHIST(1);
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
      },[]);
  const CallHIST=(val)=>{
    const newvalue=val
    console.log("hahah",newvalue);
    axios
    .get(`${Ngrok.url}/api/management/histogram/${newvalue}`)
    .then(function (response) {
      setHist(response.data.amounts);
      setmonths(response.data.months)
      //setisload(false);
    })
    .catch(function (error) {
      // handle error
      console.log("error",error.message);
    })
    .finally(function () {
      // always executed
    });

  }
  return (
    <ScrollView>
      <Text style={styles.header}>SUBSCRIPTION STATS</Text>
      {/* style={{alignSelf:'flex-start'}} */}
      {isLoading ? <ActivityIndicator/>:<View ><PieChart
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
            population: data.onlyRegisteredUsers,
            color: '#F00',
            legendFontColor: 'black',
            legendFontSize: 12,
          },
          {
            name: '[No Child Added]',
            population: data.noChildAdded,
            color: 'lightgreen',
            legendFontColor: 'black',
            legendFontSize: 12,
          },
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
      <Text style={styles.header}>REVENUE STATS</Text>
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
        yAxisLabel={'₹'}
        chartConfig={{
          backgroundColor: '#1CC910',
          backgroundGradientFrom: 'lightblue',//'rgb(12, 99, 250)',//'#EFF3FF',
          backgroundGradientTo: 'white',//'rgb(39, 143, 255)',//'#EFEFEF',
          decimalPlaces: 0,
          barPercentage:0.5,
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
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(12)}>
        <Text style={{fontSize:10,fontWeight:'bold',color:"white"}}>
              YEARLY
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(6)}>
        <Text style={{fontSize:10,fontWeight:'bold',color:"white"}}>
              HALF-YEARLY
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(3)}>
        <Text style={{fontSize:10,fontWeight:'bold',color:"white"}}>
              QUARTERLY
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(1)}>
        <Text style={{fontSize:10,fontWeight:'bold',color:"white"}}>
              MONTHLY
            </Text>
        </TouchableOpacity>
        </View>
      </View>}

    </ScrollView>
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