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
  const [data, setData] = useState();
  const [isLoading, setisload] = useState(true);
  const [hist, setHist] = useState([10, 18, 8, 20, 25]);
  const [months, setmonths] = useState(['January', 'February', 'March', 'April', 'May',]);
  useEffect(() => {
    CallHIST(1);

  }, []);
  const CallHIST = (val) => {
    const newvalue = val
    console.log("hahah", newvalue);
    axios
      .get(`${Ngrok.url}/api/management/tripsreport/${newvalue}`)
      .then(function (response) {
        setHist(response.data.trips);
        setmonths(response.data.months)
        
        //setisload(false);
      })
      .catch(function (error) {
        // handle error
        console.log("error", error.message);
      })
      .finally(function () {
        // always executed
      });

  }
  return (
    <ScrollView>


      <View>
        <Text style={styles.header}>TRIP STATS</Text>
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
          width={Dimensions.get('window').width - 30}
          height={220}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#1CC910',
            backgroundGradientFrom: 'lightblue',//'rgb(12, 99, 250)',//'#EFF3FF',
            backgroundGradientTo: 'white',//'rgb(39, 143, 255)',//'#EFEFEF',
            decimalPlaces: 0,
            barPercentage: 0.5,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginLeft: 10,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.histBtn} onPress={() => CallHIST(12)}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: "white" }}>
              YEARLY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.histBtn} onPress={() => CallHIST(6)}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: "white" }}>
              HALF-YEARLY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.histBtn} onPress={() => CallHIST(3)}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: "white" }}>
              QUARTERLY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.histBtn} onPress={() => CallHIST(1)}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: "white" }}>
              MONTHLY
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row",marginBottom:150,marginLeft:5 }}>
          <View>
          <Text style={{ justifyContent: 'center', marginTop: 6, marginLeft: 10,fontWeight: "bold" ,fontSize:15 }}>Month</Text>
          {
            months.map((item1) => (

              <View>
                <Text style={{ justifyContent: 'center', marginTop: 6, marginLeft: 10,fontWeight: "bold" ,fontSize:15}}>{item1} :- </Text>
              </View>
            ))

          }
          </View>
          <View>
            <Text style={{ justifyContent: 'center', marginTop: 6, marginLeft: 10,fontWeight: "bold" ,fontSize:15 }}>Total no of trips</Text>
          {
            hist.map((item2) => (

              <View >
                <Text style={{ justifyContent: 'center', marginTop: 6, marginLeft: 10,fontWeight: "bold" ,fontSize:15 }}>{item2}</Text>
              </View>
            ))

          }
          </View>
        </View>
      </View>

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
    marginHorizontal: "2%"
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});