
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import Onboarding from './src/navigation/onboardingnavigation';
import DriverNav from './src/navigation/driver_tabbar_nav';
import ParentNav from './src/navigation/parent_tabbar_nav';
import AdminNav from './src/navigation/admin_tabbar';
import NannyNav from './src/navigation/nanny_tabbar_nav';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export default function App() {

  var foreground

  useEffect(() => {

    messaging().getToken()
      .then(token => {
        AsyncStorage.setItem("FBtoken", token)
      })

    messaging().onTokenRefresh(token => {
      AsyncStorage.setItem("FBtoken", token)
    })

    foreground = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.body);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Notification caused app to open from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

  }, [])

  return (
    <NavigationContainer>
      <AdminNav/>
    </NavigationContainer>
  );
}
