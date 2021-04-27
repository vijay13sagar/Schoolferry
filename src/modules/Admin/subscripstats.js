import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet, StatusBar,
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setisload] = useState(true);
  const [hist, setHist] = useState([10, 18, 8, 20, 25]);
  const months = ['Parents', 'TotalChild', 'SubChild', 'UnSubChild',];

  const [emphist, setEmpHist] = useState([10, 18, 8, 20, 25]);
  const [emp, setEmp] = useState([]);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${Ngrok.url}/api/management/piechart`)
      .then(function (response) {
        setData(response.data);
        setisload(false);
      })
      .catch(function (error) {
        setLoading(false);


      })
      .finally(function () {

      });
    axios
      .get(`${Ngrok.url}/api/management/usersreport`)
      .then(function (response) {
        setHist(response.data.usersVal);
        setEmpHist(response.data.employeesVals);
        setEmp(response.data.employees);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

      })
      .finally(function () {
      });
  }, []);
  return (
    <View style={styles.container1}>
      <Loader loading={loading} />
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#FF5C00"
        translucent={false}
      />
      <ScrollView>
        <Text style={styles.header}>SUBSCRIPTION STATS</Text>

        {isLoading ? <ActivityIndicator /> : <View >

          <PieChart
            data={[
              {
                name: '[Subscribed]',
                population: data.subscribedUsers,
                color: '#fca652',
                legendFontColor: 'black',
                legendFontSize: 12,
              },
              {
                name: '[Not Subscribed]',
                population: data.unSubscribedUsers,
                color: '#FF5C00',
                legendFontColor: 'black',
                legendFontSize: 12,
              },
            ]}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
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
            absolute
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
              decimalPlaces: 0,
              barPercentage: 1,
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
              decimalPlaces: 0,
              barPercentage: 1,
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
        </View>}

      </ScrollView>
    </View>
  );
};

export default MyPieChart;




