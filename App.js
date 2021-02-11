import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AdminNav from './src/navigation/admin_tabbar';
import Onboarding from './src/navigation/onboardingnavigation';
import DriverNav  from './src/navigation/driver_tabbar_nav';
import ParentNav from './src/navigation/parent_tabbar_nav';
import NannyNav from './src/navigation/nanny_tabbar_nav';

// for accessing driver interface temporarily use - <DriverNav /> - in place of <Onboarding />
export default function App() {
  return ( 
    <NavigationContainer>
         <Onboarding/>
    </NavigationContainer>
  );
} 
