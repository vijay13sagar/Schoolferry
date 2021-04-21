import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Ngrok from '../../constants/ngrok';
import ToastComponent from '../../components/Toaster';
import * as ToastMessage from '../../constants/ToastMessages';
import styles from '../../components/style';
import axios from 'axios';
import Loader from '../../components/Loader';

const Subscriptions = ({route, navigation}) => {
  const [data, setData] = useState('');
  const [childid, setChild] = useState(route.params.childID);
  const [showtoast, setToast] = useState(false);
  const [message, SetMessage] = useState();
  const [isloading, setLoading] = useState(true);

  const skool = route.params.school;
  const Homeaddress = route.params.homeaddress;
  const distance = route.params.distance;

  useEffect(() => {
    async function fetchData() {
      let token = await childid;
      try {
        const response = await axios
          .get(`${Ngrok.url}/api/package/${token}`)
          .then(function (response) {
            setToast(true);
            SetMessage(ToastMessage.message8);
            setData(response.data);
            setLoading(false);

          });
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }
    setToast(false);
    fetchData();
  }, []);

  return isloading ? (
    <View style={styles.container}>
      <Loader loading={isloading} />
    </View>
  ) : (
    <View style={styles.container}>
      {showtoast ? (
        <ToastComponent type={ToastMessage.success} message={message} />
      ) : null}
      <View style={styles.firstBox}>
        <Text style={styles.planTitleText}>Subscription Plans </Text>
      </View>
      <View style={{height: 350, marginTop: 15}}>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => {
            return item.term;
          }}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.flatlistContainer}
                onPress={() =>
                  navigation.navigate('Plan Details', {
                    item: item,
                    schooladdress: skool,
                    childid: route.params.childID,
                  })
                }>
                <Image
                  style={styles.avatar}
                  source={{
                    uri:
                      'https://image.freepik.com/free-vector/cartoon-school-bus-with-children_23-2147827214.jpg',
                  }}
                />
                <Text style={styles.typeOfSubscription}>{item.term}</Text>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>Trip Cost</Text>
                  <Text style={styles.price}> - ₹ {item.tripcost}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>Nanny</Text>
                  <Text style={styles.price}> - ₹ {item.nannycost}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.serviceDetails}>GST</Text>
                  <Text style={styles.price}> - ₹ {item.gst}</Text>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalCost}> - ₹ {item.total}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={styles.randomText}>Swipe left to see all plans. </Text>

      <View style={styles.addChildContainer}>
        <Text style={styles.addChildText}>
          * Compulsory nanny service for children till 8 years
        </Text>
        <Text style={styles.addChildText}>
          * In case nanny service is required for children above 8 years ,
          please contact admin
        </Text>
      </View>
    </View>
  );
};

export default Subscriptions;
