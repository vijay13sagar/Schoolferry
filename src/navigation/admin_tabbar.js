import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Employee from '../modules/Admin/employee';

import Add_Vehicle from '../modules/Admin/add_vehicle';
import Add_Driver from '../modules/Admin/Add_Driver';
import Add_Nanny from '../modules/Admin/Add_Nanny';
import driverList from '../modules/Admin/driverlist';
import driver_Details from '../modules/Admin/driver_details';
import nanny_Details from '../modules/Admin/nanny_details';
import nannyList from '../modules/Admin/nannylist';
import vehicleList from '../modules/Admin/vehicle';
import vehicle_Details from '../modules/Admin/vehicle_details';
import userList from '../modules/Admin/user';
import user_Details from '../modules/Admin/user_Details';

import child_Details from '../modules/Admin/child_Details';
import Home_page from '../modules/Admin/home';
import Trip_Details from '../modules/Admin/daily trip details';
import dailyChildtrip_list from '../modules/Admin/dailyChildtrip_list';
import remove_Child from '../modules/Admin/remove child';
import freeChildtrip_list from '../modules/Admin/freeChildtrip_list ';
import add_Child from '../modules/Admin/add child';
import freeDrivertrip_list from '../modules/Admin/freeDrivertrip_list ';
import Edit_Driver from '../modules/Admin/Edit driver';
import freeNannytrip_list from '../modules/Admin/freeNannytrip_list';
import Edit_Nanny from '../modules/Admin/Edit nanny';
import freeVehicletrip_list from '../modules/Admin/freeVehicletrip_list';
import Edit_Vehicle from '../modules/Admin/Edit vehicle';
import Rev_stats from '../modules/Admin/revenuestats';
import Sub_stats from '../modules/Admin/subscripstats';
import Trip_stats from '../modules/Admin/tripstats';
import Manageoptions from '../modules/Admin/manageoptions';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Homestack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#000000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: "center"
      }}>
      <Stack.Screen
        name="Home_page"
        component={Home_page}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Trip_Details"
        component={Trip_Details}
        options={{ title: 'Trip Details' }}
      />
      <Stack.Screen
        name="dailyChildtrip_list"
        component={dailyChildtrip_list}
        options={{ title: 'Child List' }}
      />
      <Stack.Screen
        name="freeChildtrip_list"
        component={freeChildtrip_list}
        options={{ title: ' Child List' }}
      />
      <Stack.Screen
        name="remove_Child"
        component={remove_Child}
        options={{ title: 'Child Details' }}
      />
      <Stack.Screen
        name="add_Child"
        component={add_Child}
        options={{ title: 'Child List' }}
      />
      <Stack.Screen
        name="freeDrivertrip_list"
        component={freeDrivertrip_list}
        options={{ title: 'Driver List' }}
      />
      <Stack.Screen
        name="Edit_Driver"
        component={Edit_Driver}
        options={{ title: 'Driver Details' }}
      />
      <Stack.Screen
        name="freeNannytrip_list"
        component={freeNannytrip_list}
        options={{ title: 'nanny List' }}
      />
      <Stack.Screen
        name="Edit_Nanny"
        component={Edit_Nanny}
        options={{ title: 'Nanny Details' }}
      />
      <Stack.Screen
        name="freeVehicletrip_list"
        component={freeVehicletrip_list}
        options={{ title: 'Vehicle List' }}
      />
      <Stack.Screen
        name="Edit_Vehicle"
        component={Edit_Vehicle}
        options={{ title: 'Vehicle Details' }}
      />

    </Stack.Navigator>
  );
}
function UserStack() {
  return (


    <Stack.Navigator
      initialRouteName="user"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#000000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: "center"
      }}>
      <Stack.Screen
        name="UserList"
        component={userList}
        options={{ title: 'Customer' }}
      />
      <Stack.Screen
        name="user_Details"
        component={user_Details}
        options={{ title: 'Customer Details' }}
      />

      <Stack.Screen
        name="child_Details"
        component={child_Details}
        options={{ title: 'Child Details' }}
      />
    </Stack.Navigator>
  );
}
function EmployeeStack() {
  return (
    <Stack.Navigator
      initialRouteName="employee"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#000000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: "center"
      }}>
      <Stack.Screen
        name="Employee"
        component={Employee}
        options={{ title: 'Employees' }}
      />
      <Stack.Screen
        name="driverList"
        component={driverList}
        options={{ title: 'Driver' }}
      />
      <Stack.Screen
        name="nannyList"
        component={nannyList}
        options={{ title: 'Nanny' }}
      />
      <Stack.Screen
        name="Add_Driver"
        component={Add_Driver}
        options={{ title: 'Add Driver' }}
      />
      <Stack.Screen
        name="Add_Nanny"
        component={Add_Nanny}
        options={{ title: 'Add Nanny' }}
      />
      <Stack.Screen
        name="driver_Details"
        component={driver_Details}
        options={{ title: 'Driver Details' }}
      />
      <Stack.Screen
        name="nanny_Details"
        component={nanny_Details}
        options={{ title: 'Nanny Details' }}
      />

    </Stack.Navigator>
  );
}
function VehicleStack() {
  return (
    <Stack.Navigator
      initialRouteName="Vehicle"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#000000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: "center"
      }}>
      {/* <Stack.Screen
        name="Vehicle"
        component={Vehicle}
        options={{ title: 'Vehicle Details' }}
      /> */}
      <Stack.Screen
        name="vehicleList"
        component={vehicleList}
        options={{ title: 'Vehicle' }}
      />
      <Stack.Screen
        name="Add_Vehicle"
        component={Add_Vehicle}
        options={{ title: 'Add Vehicle' }}
      />
      <Stack.Screen
        name="vehicle_Details"
        component={vehicle_Details}
        options={{ title: 'Vehicle Details' }}
      />

    </Stack.Navigator>
  );
}
function WebsiteStack() {
  return (
    <Stack.Navigator
      initialRouteName="ManageOptions"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#000000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: "center"
      }}>
      <Stack.Screen
        name="ManageOptions"
        component={Manageoptions}
        options={{ title: 'Reports' }}
      />

      <Stack.Screen
        name="TripStats"
        component={Trip_stats}
        options={{ title: 'Reports' }}
      />
      <Stack.Screen
        name="SubStats"
        component={Sub_stats}
        options={{ title: 'Reports' }}
      />
      <Stack.Screen
        name="RevStats"
        component={Rev_stats}
        options={{ title: 'Reports' }}
      />


    </Stack.Navigator>
  );
}


function App() {



  return (





    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Customer') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          else if (route.name === 'Employee') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          }
          else if (route.name === 'Vehicle') {
            iconName = focused ? 'bus' : 'bus-outline';
          }
          else if (route.name === 'Management') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF5C00',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Homestack} />
      <Tab.Screen name="Customer" component={UserStack} />
      <Tab.Screen name="Employee" component={EmployeeStack} />
      <Tab.Screen name="Vehicle" component={VehicleStack} />
      <Tab.Screen name="Management" component={WebsiteStack} />
    </Tab.Navigator>


  );
}
export default App;