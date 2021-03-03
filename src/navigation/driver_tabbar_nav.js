import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../modules/driver/homepage';
import Checklist from '../modules/driver/checklist';
import Notifications from '../modules/driver/notification';
import Profile_Driver from '../modules/driver/profile';
import changePassword from '../components/changepassword';
import updateProfile from '../modules/driver/updateprofile';
import tripDetails from '../modules/driver/tripdetails'
import Trackee from '../modules/driver/map';
import Notstarted from '../modules/driver/notstarted';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Check() {
  return (
    <Stack.Navigator
      initialRouteName="Check_list"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
        //headerShown: false
      }}>
      <Stack.Screen
        name="Check_list"
        component={Checklist}
      options={{ title: 'CheckList' }}
      />
    </Stack.Navigator>
  );
}
function Homepage() {
  return (
    <Stack.Navigator
      initialRouteName="Homey"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
        //headerShown: false
      }}>
      <Stack.Screen
        name="Homey"
        component={Home}
      options={{ title: 'Home' }}
      />
       <Stack.Screen
        name="Trip Details"
        component={tripDetails}
        options={{ title: 'Trip Details' }}
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
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name="Profile_screen"
        component={Profile_Driver}
        options={{ title: 'Profile ' }}
      />
      <Stack.Screen
        name="Change Password"
        component={changePassword}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="Update profile"
        component={updateProfile}
        options={{ title: 'Edit Profile' }}
      />

    </Stack.Navigator>
  );
}
function Map() {
  return (
    <Stack.Navigator
      initialRouteName="Tripnotstarted"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
        //headerShown: false
      }}>
      <Stack.Screen
        name="Tripnotstarted"
        component={Notstarted}
      options={{ title: 'Map' }}
      />
      <Stack.Screen
        name="Trackee"
        component={Trackee}
      options={{title: 'Map' }}
      />
      
    </Stack.Navigator>
  );
}
function Notices() {
  return (
    <Stack.Navigator
      initialRouteName="notifications"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
        //headerShown: false
      }}>
      <Stack.Screen
        name="notifications"
        component={Notifications}
      options={{ title: 'Notifications' }}
      />
      
    </Stack.Navigator>
  );
}



const DriverTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'ios-map-outline';
          }
          else if (route.name === 'Checklist') {
            iconName = focused ? 'checkbox' : 'ios-checkbox-outline';
          }
          else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'ios-notifications-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'ios-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Checklist" component={Check} />
      <Tab.Screen name="Notifications" component={Notices} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}



export default DriverTab;