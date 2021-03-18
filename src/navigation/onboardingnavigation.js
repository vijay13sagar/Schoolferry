
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from '../screens/login';
import Signup from '../screens/signup';
import ForgotPassword from '../screens/forgotPassword';
import parent_nav from './parent_tabbar_nav';
import admin_tabbar from './admin_tabbar';
import nanny_nav from './nanny_tabbar_nav';
import driver_nav from './driver_tabbar_nav';
import OTP_screen from '../screens/otpscreen';


const Stack = createStackNavigator();

const OnboardingNav = () => {
        return (
                <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}   >
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="Sign up" component={Signup} />
                        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                        <Stack.Screen name="OTPscreen" component={OTP_screen} options={{ headerShown: false }}/>
                        <Stack.Screen name="Parent Interface" component={parent_nav} options={{ headerShown: false }} />
                        <Stack.Screen name="Admin Interface" component={admin_tabbar} options={{ headerShown: false }} />
                        <Stack.Screen name="Nanny Interface" component={nanny_nav} options={{ headerShown: false }} />
                        <Stack.Screen name="Driver Interface" component={driver_nav} options={{ headerShown: false }} />
                </Stack.Navigator>
        );
}

export default OnboardingNav;