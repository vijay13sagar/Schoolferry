
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import Onboarding from './src/navigation/onboardingnavigation';
import DriverNav from './src/navigation/driver_tabbar_nav';
import ParentNav from './src/navigation/parent_tabbar_nav';
import AdminNav from './src/navigation/admin_tabbar';
import NannyNav from './src/navigation/nanny_tabbar_nav';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';


// for accessing driver interface temporarily use - <DriverNav /> - in place of <Onboarding />

export default function App() {

  var foreground

  useEffect(() => {

    messaging().getToken()
      .then(token => {
        console.log('firebase token:', token)
        AsyncStorage.setItem("FBtoken", token)
      })

    messaging().onTokenRefresh(token => {
      console.log('token refresh', token)
      AsyncStorage.setItem("FBtoken", token)
    })

    // foreground message handler 
    foreground = messaging().onMessage(async remoteMessage => {
     // alert('A new notification arrived!', JSON.stringify(remoteMessage));
      console.log('Message handled in the foreground!', remoteMessage);
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
     // navigation.navigate('Track');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
         // setInitialRoute(remoteMessage.data.type);
        }
       // setLoading(false);
      });

  }, [])

  return (
    <NavigationContainer>
      <Onboarding/>
    </NavigationContainer>
  );
}