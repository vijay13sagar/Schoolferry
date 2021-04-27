import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import Ngrok from '../../constants/ngrok';
import styles from '../../components/styles_admin';
import axios from 'axios';

export default class freeChildtrip_list extends Component {
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
      .get(`${Ngrok.url}/api/admin/trips/children/waiting`)
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
    const tripid1 = this.props.route.params.tripid;


    return (
      <View style={styles.container1}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View >
                <Card >
                  <CardItem button onPress={() => this.props.navigation.navigate('add_Child', { tripid1: tripid1, item: item })}>
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

