import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  
  BarChart,
 
} from 'react-native-chart-kit';
import Ngrok from '../../constants/ngrok';
import Loader from '../../components/Loader';
import axios from 'axios';
import styles from '../../components/styles_admin'

const MyPieChart = () => {
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState();
  const [isLoading,setisload]=useState(true);
  const [hist, setHist] = useState([10,18,8,20, 25]);

  const [months,setmonths]= useState(['January','February','March','April','May',]);
  useEffect(() => {
    setLoading(true);
      CallHIST(1);
      },[]);
  const CallHIST=(val)=>{
    const newvalue=val
   
    axios
    .get(`${Ngrok.url}/api/management/histogram/${newvalue}`)
    .then(function (response) {
      setHist(response.data.amounts);
      setmonths(response.data.months)
      setisload(false);
      setLoading(false);
    })
    .catch(function (error) {
      setLoading(false);
      setLoading(false);
    
     
    })
    .finally(function () {
    });

  }
  return (
    <View style={styles.container1}>
    <ScrollView>
       <Loader loading={loading} />
      {isLoading ? <ActivityIndicator/>:<View >
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
        showValuesOnTopOfBars	
        width={Dimensions.get('window').width -30}
        height={220}
        yAxisLabel={'₹'}
        chartConfig={{
          backgroundColor: '#ffefa0',
          fillShadowGradient:'#FF5C00',
          fillShadowGradientOpacity:1,
          backgroundGradientFrom: '#f5a25d',
          backgroundGradientTo: '#ffefa0',
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
    </View>
  );
};

export default MyPieChart;
