
import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import Onboarding from './src/navigation/onboardingnavigation';
import DriverNav  from './src/navigation/driver_tabbar_nav';
import ParentNav from './src/navigation/parent_tabbar_nav';
import NannyNav from './src/navigation/nanny_tabbar_nav';
import messaging from '@react-native-firebase/messaging';


// for accessing driver interface temporarily use - <DriverNav /> - in place of <Onboarding />

export default function App() {

  var foreground

  useEffect(() => {

    messaging().getToken()
    .then(token =>{
      console.log('firebase token:', token)
    })

    messaging().onTokenRefresh(token => {
        console.log('token refresh', token)
      })
      // foreground message handler 
       foreground = messaging().onMessage(async remoteMessage => {
        alert('A new notification arrived!', JSON.stringify(remoteMessage));
      });

  }, [])
  
  return (
    <NavigationContainer>
         < Onboarding/>
    </NavigationContainer>
  );
} 
