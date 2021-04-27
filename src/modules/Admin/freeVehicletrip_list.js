import React, { Component } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin'
import axios from 'axios';



export default class freeVehicletrip_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,

    };
  }

  componentDidMount() {
    ;
    var self = this;
    axios
      .get(`${Ngrok.url}/api/admin/trip/available/vehicles`)
      .then(function (response) {
        self.setState({ data: response.data });
      })
      .catch(function (error) {
        console.log("error", error.message);
      })
      .finally(function () {
        self.setState({ isLoading: false });
      });

  }


  render() {
    const { data, isLoading } = this.state;
    const { modalVisible } = this.state;
    const tripid1 = this.props.route.params.s;
    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View >
                <Card >
                  <CardItem button onPress={() => this.props.navigation.navigate('Edit_Vehicle', { tripid1: tripid1, item: item })}>
                    <Body>
                      <Text>
                        Vehicle Number:-{item.regNo}
                      </Text>

                    </Body>
                  </CardItem>
                </Card>


              </View>
            )}
          />
        )}

      </View>
    );
  }
};

