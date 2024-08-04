import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingnUp from '../screen/SingnUp';
import Login from '../screen/Login';

export default function StackNagativegator() {
    const Stack = createNativeStackNavigator(); 
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="SingnUp" component={SingnUp} options={{headerShown:false}} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})