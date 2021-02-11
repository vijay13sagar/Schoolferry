import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons';

import location_details from '../modules/parent/locations';
import Home from '../modules/parent/parentHomepage';
import Vehicle_Tracking from '../modules/parent/vehicleTracking';
import subscriptions from '../modules/parent/subscriptions';
import Support from '../modules/parent/support';
import Profile_Parent from '../modules/parent/profile';
import Addchild from '../modules/parent/addingchild';
import Pauseplan from '../modules/parent/pauseplan';
import Cancelrides from '../modules/parent/cancelride';
import Plandetails from '../modules/parent/plandetails';
import Payment from '../modules/parent/paymentpart';
import Subscriptionlist from '../modules/parent/subscriptionlist';
import changePassword from '../components/changepassword';
import updateProfile from '../modules/parent/updateprofile'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
function Subscriptions() {
  return (
    <Stack.Navigator
    
    initialRouteName="Profile_screen"
    screenOptions={{
     /* headerStyle: { backgroundColor: '#42F44B' },
      headerTintColor: '#fff',*/
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign:'center'
    }}
    >
     <Stack.Screen
        name="New_sub_screen"
        component={subscriptions}
        options={{ title: 'Subscriptions ' }}
      />
      <Stack.Screen
        name="Add Child"
        component={Addchild}
        options={{ title: 'Child Details' }}
      />
      <Stack.Screen
        name="Subscription_list"
        component={Subscriptionlist}
        options={{ title: 'Subscription_list' }}
      />
      <Stack.Screen
        name="Pause Plan"
        component={Pauseplan}
        options={{ title: 'Pause Plan' }}
      />
      <Stack.Screen
        name="Cancel Rides"
        component={Cancelrides}
        options={{ title: 'Cancel Rides' }}
      />
      <Stack.Screen
        name="Plan Details"
        component={Plandetails}
        options={{ title: 'Plan Details' }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={Payment}
        options={{ title: 'Payment Screen' }}
      />
      
    </Stack.Navigator>
    
  );
}

function Homepage() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home ' }}
      />
      <Stack.Screen
        name="location"
        component={location_details}
        options={{ title: 'Enter Location' }}
      />

    </Stack.Navigator>
  );
}

function Profiles() {
  return (
    <Stack.Navigator

      initialRouteName="Profile_screen"
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen
        name="Profile_screen"
        component={Profile_Parent}
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
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Track') {
            iconName = focused ? 'bus' : 'bus-outline';
          }
          else if (route.name === 'Subscriptions') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          else if (route.name === 'Support') {
            iconName = focused ? 'mail' : 'mail-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
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
      <Tab.Screen name="Track" component={Vehicle_Tracking} />
      <Tab.Screen name="Subscriptions" component={Subscriptions} />
      <Tab.Screen name="Support" component={Support} />
      <Tab.Screen name="Profile" component={Profiles} />
    </Tab.Navigator>

          
  );
}

export default TabNavigator;