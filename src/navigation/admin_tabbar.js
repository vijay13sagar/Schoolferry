import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Employee from '../modules/Admin/employee';
import Website from '../modules/Admin/website';
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
import userSubscription from '../modules/Admin/usersubscription';
import child_Details from '../modules/Admin/child_Details';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home_page from '../modules/Admin/home';
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
        headerTitleAlign:"center"
      }}>
      <Stack.Screen
        name="Home_page"
        component={Home_page}
        options={{ title: 'Home' }}
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
        headerTitleAlign:"center"
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
        name="userSubscription"
        component={userSubscription}
        options={{ title: 'Child Details' }}
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
        headerTitleAlign:"center"
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
        options={{ title:  'Nanny Details' }}
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
        headerTitleAlign:"center"
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
        initialRouteName="website"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#000000',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign:"center"
        }}>
        <Stack.Screen
          name="website"
          component={Website}
          options={{ title: 'website' }}
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
            iconName = focused ? 'home' : 'home';
          }
          else if (route.name === 'Customer') {
            iconName = focused ? 'person-circle' : 'person-circle';
          }
          else if (route.name === 'Employee') {
            iconName = focused ? 'person' : 'person';
          }
          else if (route.name === 'Vehicle') {
            iconName = focused ? 'bus' : 'bus';
          }
          else if (route.name === 'Website') {
            iconName = focused ? 'logo-web-component' : 'logo-web-component';
          }
       

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
      }}
    >
       <Tab.Screen name="Home" component={Homestack} />
      <Tab.Screen name="Customer" component={UserStack} />
      <Tab.Screen name="Employee" component={EmployeeStack} />
      <Tab.Screen name="Vehicle" component={VehicleStack} />
      <Tab.Screen name="Website" component={WebsiteStack} />
    </Tab.Navigator>
   
  );
}
export default App;