import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SingnUp from '../screen/SingnUp';
import Login from '../screen/Login';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen'; // Assuming you have a Profile component
import CartScreen from '../screen/CartScreen'; // Assuming you have a Cart component
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Import the icons

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ focused }) => ({
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ focused }) => ({
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={({ focused }) => ({
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name={focused ? 'shopping-cart' : 'shopping-cart'}
                size={size}
                color={color}
              />
            ),
          })}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SingnUp} options={{ headerShown: false }} />
        <Stack.Screen
          name="HomeTabs"
          component={BottomTabs}
          options={{ headerShown: false }} // This hides the header for HomeTabs
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
