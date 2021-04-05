import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, FlatList, Text, View, Modal } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ngrok from '../../constants/ngrok';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import styles from '../../components/style';


export default class Notificationlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      selected: false,
      modalVisible: false,
      selectedData: '',
      selectedDate: '',
      selectedTitle: '',
    };
  }
  onFocusFunction = async () => {
    this.setState({ isLoading: true });
    let token = await AsyncStorage.getItem('token')
    fetch(`${Ngrok.url}/api/notices/${token}`, {
      "method": "GET",
      "headers": {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
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
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  _selectedItem = (data, data2, data3) => {
    this.setState({ selectedData: data, selectedDate: data2, selectedTitle: data3, selected: !this.state.selected });
    this.setModalVisible(true);
  }
  render() {
    const { data, isLoading, selected } = this.state;
    const { modalVisible } = this.state;

    return (
      <View style={{ flex: 1, padding: 3, backgroundColor: "#FCFDDB", }}>
        <Loader loading={isLoading} />
        <StatusBar
          barStyle="light-content" hidden={false} backgroundColor="#FF5C00" translucent={true}
        />
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View><Card>
              <CardItem button onPress={() => {
                this._selectedItem(item.message, item.date, item.title)
              }}>
                <Body>
                  <Text>
                    {item.title}
                  </Text>
                </Body>
              </CardItem>
            </Card>
              {/* { selected ? <Card>
                <Body>
                  <Text>
                    {item.title},{item.date},{item.message}
                  </Text>
                </Body>
              </Card> : null} */}
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <Ionicons name="close-circle-outline"
              color="#fff" size={30}
              style={styles.icon}
              onPress={(modalVisible) => this.setModalVisible(!modalVisible)}
            />
            <View style={styles.modalBody}>
              <Text style={styles.modalheading}> {this.state.selectedTitle}</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={styles.modalheading}>Date of Notice:</Text>
                <Text style={styles.notice}>{this.state.selectedDate}</Text>
              </View>
              <Text style={styles.notice}>{this.state.selectedData}</Text>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
};