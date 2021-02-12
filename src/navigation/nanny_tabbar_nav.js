import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Notifications from '../modules/nanny/notices';
import Trips from '../modules/nanny/nannyhome';
import Profile_Nanny from '../modules/nanny/profile';
import change_pwd from '../modules/nanny/changepwd';
import Trip_details from '../modules/nanny/tripdetails';
import Child_list from '../modules/nanny/childlist';
import Child_details from '../modules/nanny/childdetails';
import History from '../modules/nanny/history';
import updateprof from '../modules/nanny/updatenannypro';

const Tab = createBottomTabNavigator()
const Stack=createStackNavigator()
function Notification() {
  return (
    <Stack.Navigator
    
    initialRouteName="Notification page"
    screenOptions={{
    //  headerStyle: { backgroundColor: '#42F44B' },
    //   headerTintColor: '#fff',
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
function Triphistory() {
  return (
    <Stack.Navigator
    
    initialRouteName="History page"
    screenOptions={{
      // headerStyle: { backgroundColor: '#42F44B' },
      // headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
    }}
    >
     <Stack.Screen
        name="History page"
        component={History}
        options={{ title: 'Trip History' }}
      />
    </Stack.Navigator>
  );
}
function Profile() {
  return (
    <Stack.Navigator
    
    initialRouteName="Profile_screen"
    screenOptions={{
    //  headerStyle: { backgroundColor: '#f06292' },
    //   headerTintColor: '#fff',
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
        name="Passwordchange"
        component={change_pwd}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="Updateprof"
        component={updateprof}
        options={{ title: 'Update Profile' }}
      />
    </Stack.Navigator>
  );
}
function Home() {
  return (
    <Stack.Navigator
    
    initialRouteName="Home_screen"
    screenOptions={{
    //  headerStyle: { backgroundColor: '#42F44B' },
    //   headerTintColor: '#fff',
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
          }//clipboard or receipt  icon name for history
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
        activeTintColor: '#ff5c8d',
        inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notifications" component={Notification} />
        <Tab.Screen name="Trip History" component={Triphistory} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    );
}

export default NannyTab;