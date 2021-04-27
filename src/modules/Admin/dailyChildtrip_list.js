import React, { Component } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, StyleSheet, FlatList, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ngrok from '../../constants/ngrok';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../components/styles_admin'
import axios from 'axios';

export default class dailyChildtrip_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,

    };
  }

  componentDidMount() {
    const tripid = this.props.route.params.s;
    var self = this;
    axios
      .get(`${Ngrok.url}/api/admin/trips/children/${tripid}`)
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
    const tripid = this.props.route.params.s;



    return (
      <View style={styles.container1}>

        <TouchableOpacity style={{
          width: "35%",
          borderRadius: 10,
          height: 40,
          alignSelf: "flex-end",
          backgroundColor: "#FF5C00",
        }} onPress={() => this.props.navigation.navigate('freeChildtrip_list', { tripid: tripid })}>
          <Text style={{ alignSelf: "center", marginTop: 9, color: "white" }}>Add Child </Text>
        </TouchableOpacity>

        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View >
                <Card >
                  <CardItem button onPress={() => this.props.navigation.navigate('remove_Child', { tripid: tripid, item: item })}>
                    <Body>
                      <Text>
                        ID:-{item.childId} Name:-{item.childName}
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

