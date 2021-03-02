
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from './src/navigation/onboardingnavigation';
import DriverNav from './src/navigation/driver_tabbar_nav';
import ParentNav from './src/navigation/parent_tabbar_nav';
import NannyNav from './src/navigation/nanny_tabbar_nav';
import messaging from '@react-native-firebase/messaging';


// for accessing driver interface temporarily use - <DriverNav /> - in place of <Onboarding />

export default function App() {

  var foreground

  useEffect(() => {

    messaging().getToken()
      .then(token => {
        console.log('firebase token:', token)
      })

    messaging().onTokenRefresh(token => {
      console.log('token refresh', token)
    })

    // foreground message handler 
    foreground = messaging().onMessage(async remoteMessage => {
      alert('A new notification arrived!', JSON.stringify(remoteMessage));
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
     // navigation.navigate(remoteMessage.data.type);
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
      < Onboarding/>
    </NavigationContainer>
  );
} 

