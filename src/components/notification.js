import React, { Component } from 'react';
import { StatusBar, FlatList, Text, View } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Loader';
import styles from './style';
import axios from 'axios';

export default class Notificationlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      selected: false,
      item1: [],
    };
  }
  onFocusFunction = async () => {
    this.setState({ isLoading: true });
    let token = await AsyncStorage.getItem('token')
    let self = this;
    axios
      .get(`${Ngrok.url}/api/notices/${token}`)
      .then(function (response) {
        self.setState({ data: response.data });
        self.setState({ item1: response.data.map(child => ({ ...child, attend: false })) })
      })
      .catch(function (error) {
        console.log("error", error.message);
      })
      .finally(function () {
        self.setState({ isLoading: false });
      });
  }
  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onFocusFunction()
    })
  }
  componentWillUnmount() {
    this.focusListener()
  }
  Enlarge = (item) => {
    const data1 = this.state.item1.map(child => {
      if (child.message === item.message) {
        return { ...child, attend: !child.attend }
      }
      return child
    })
    this.setState({ item1: data1 })
  }
  render() {
    const { item1, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={isLoading} />
        <StatusBar
          barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
        />
        <FlatList
          data={item1}
          keyExtractor={({ message }, index) => message}
          renderItem={({ item }) => (
            <View><Card>
              <CardItem button onPress={() => {
                {
                  this.Enlarge(item)
                }
              }}>
                <Body style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 3 }}>
                  <Text style={{ alignSelf: 'flex-start' }}>
                    {item.title}
                  </Text>
                  <Text style={{ alignSelf: 'flex-end' }}>
                    {item.attend ? <Ionicons name="chevron-up"
                      color="#000" size={25}
                    /> : <Ionicons name="chevron-down"
                      color="#000" size={25}
                    />}
                  </Text>
                </Body>
              </CardItem>
            </Card>
              { item.attend ? <Card>
                <Body>
                  <Text style={styles.modalheading}> {item.title}</Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={styles.modalheading}>Date of Notice:</Text>
                    <Text style={styles.notice}>{item.date}</Text>
                  </View>
                  <Text style={styles.notice}>{item.message}</Text>
                </Body>
              </Card> : null}
            </View>
          )}
        />
      </View>
    );
  }
};