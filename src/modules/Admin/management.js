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
      //CallHIST(1);
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
  }
  return (
    <ScrollView>
      <Text style={styles.header}>SUBSCRIPTION STATS</Text>
      {isLoading ? <ActivityIndicator/>:<PieChart
        data={[
          {
            name: '[Subscribed]',
            population:data.subscribedUsers,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: 'black',
            legendFontSize: 14,
          },
          {
            name: '[Registered]',
            population: data.onlyRegisteredUsers,
            color: '#F00',
            legendFontColor: 'black',
            legendFontSize: 14,
          },
          {
            name: '[No Child Added]',
            population: data.noChildAdded,
            color: 'lightgreen',
            legendFontColor: 'black',
            legendFontSize: 14,
          },
        ]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
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
      />}
      <Text style={styles.header}>MONTHLY STATS</Text>
      <BarChart
        data={{
          labels: months,
          datasets: [
            {
              data: hist,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel={'Rs'}
        chartConfig={{
          backgroundColor: '#1CC910',
          backgroundGradientFrom: '#EFF3FF',
          backgroundGradientTo: '#EFEFEF',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(12)}>
        <Text style={{fontSize:13,fontWeight:'bold'}}>
              1 YEAR
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(6)}>
        <Text style={{fontSize:13,fontWeight:'bold'}}>
              6 MONTHS
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(3)}>
        <Text style={{fontSize:13,fontWeight:'bold'}}>
              3 MONTHS
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.histBtn} onPress={()=>CallHIST(1)}>
        <Text style={{fontSize:13,fontWeight:'bold'}}>
              1 MONTH
            </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default MyPieChart;
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   padding: 10,
  // },
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
    marginHorizontal:10
  },
  header: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});



