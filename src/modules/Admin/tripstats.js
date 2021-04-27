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
import Loader from '../../components/Loader';
import axios from 'axios';
import styles from '../../components/styles_admin'

const MyPieChart = () => {
  const [data, setData] = useState();
  const [isLoading, setisload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hist, setHist] = useState([10, 18, 8, 20, 25]);
  const [months, setmonths] = useState(['January', 'February', 'March', 'April', 'May',]);
  const [vehhist, setVehHist] = useState([]);
  const [veh, setVeh] = useState([]);
  useEffect(() => {
    setLoading(true);

    CallHIST(1);
    axios
      .get(`${Ngrok.url}/api/management/usersreport`)
      .then(function (response) {
        setVehHist(response.data.capacity);
        setVeh(response.data.vehicles);
        setLoading(false);
      })
      .catch(function (error) {

        setLoading(false);


      })
      .finally(function () {

      });

  }, []);
  const CallHIST = (val) => {
    const newvalue = val

    axios
      .get(`${Ngrok.url}/api/management/tripsreport/${newvalue}`)
      .then(function (response) {
        setHist(response.data.trips);
        setmonths(response.data.months)


      })
      .catch(function (error) {


      })
      .finally(function () {

      });

  }
  return (
    <ScrollView>
      <View style={styles.container1}>
        <Loader loading={loading} />
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
            showValuesOnTopOfBars
            width={Dimensions.get('window').width - 30}
            height={220}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#ffefa0',
              fillShadowGradient: '#FF5C00',
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: '#f5a25d',
              backgroundGradientTo: '#ffefa0',
              decimalPlaces: 1,
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

          <Text style={styles.header}>VEHICLE STATS</Text>
          <BarChart
            data={{
              labels: veh,
              datasets: [
                {
                  data: vehhist,
                },
              ],
            }}
            fromZero
            showValuesOnTopOfBars
            width={Dimensions.get('window').width - 30}
            height={220}

            chartConfig={{
              backgroundColor: '#ffefa0',
              fillShadowGradient: '#FF5C00',
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: '#f5a25d',
              backgroundGradientTo: '#ffefa0',
              decimalPlaces: 1,
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
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPieChart;
