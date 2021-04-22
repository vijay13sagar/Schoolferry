import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Notifications from '../components/notification';
import Trips from '../modules/nanny/nannyhome';
import Profile_Nanny from '../modules/nanny/profile';
import changePassword from '../components/changepassword';
import Trip_details from '../modules/nanny/tripdetails';
import Child_list from '../modules/nanny/childlist';
import Child_details from '../modules/nanny/childdetails';
import History from '../modules/nanny/history';
import updateProfile from '../components/updateprofile';
import End_trips from '../modules/nanny/endtrips';

const Tab = createBottomTabNavigator()
const Stack=createStackNavigator()

function Home() {
  return (
    <Stack.Navigator
    
    initialRouteName="Home_screen"
    screenOptions={{
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
    }}
    >
     <Stack.Screen
        name="Home_screen"
        component={Trips}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Tripdetails"
        component={Trip_details}
        options={{ title: 'Trip Details' }}
      />
      <Stack.Screen
        name="Child List"
        component={Child_list}
        options={{ title: 'List of Children' }}
      />
      <Stack.Screen
        name="Child Details"
        component={Child_details}
        options={{ title: 'Child Details' }}
      />

    </Stack.Navigator>
  );
}

function Triphistory() {
  return (
    <Stack.Navigator
    
    initialRouteName="History page"
    screenOptions={{
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
    }}
    >
     <Stack.Screen
        name="History page"
        component={History}
        options={{ title: 'Trip History' }}
      />
      <Stack.Screen
        name="trip_ended"
        component={End_trips}
        options={{ title: 'Trip Details' }}
      />
      <Stack.Screen
        name="oldChild Details"
        component={Child_details}
        options={{ title: 'Child Details' }}
      />
    </Stack.Navigator>
  );
}

function Notification() {
  return (
    <Stack.Navigator
    
    initialRouteName="Notification page"
    screenOptions={{
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
    }}
    >
     <Stack.Screen
        name="Notifications page"
        component={Notifications}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
}

function Profile() {
  return (
    <Stack.Navigator
    
    initialRouteName="Profile_screen"
    screenOptions={{
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
      
    }}
    >
     <Stack.Screen
        name="Profile_screen"
        component={Profile_Nanny}
        options={{ title: 'Profile ' }}
      />
      <Stack.Screen
        name="Change Password"
        component={changePassword}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="Updateprof"
        component={updateProfile}
        options={{ title: 'Update Profile' }}
      />
    </Stack.Navigator>
  );
}

const NannyTab = () => {
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
           else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }
          else if (route.name === 'Trip History') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF5C00',
        inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trip History" component={Triphistory} />
        <Tab.Screen name="Notifications" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    );
}

export default NannyTab;