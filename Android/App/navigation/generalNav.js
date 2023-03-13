import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/screens/General/Home'
import LoginScreen from '../src/screens/General/Login'
import SignUp from '../src/screens/General/SignUp';
import Result from '../src/screens/General/result';
import { HomeStackScreen } from './userNav';
import { HomeDrawerScreen } from './admin';

const Stack = createStackNavigator();

export function GeneralNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="UserHome" component={HomeStackScreen} />
        <Stack.Screen name="AdminHome" component={HomeDrawerScreen} />
      </Stack.Navigator>
  );
}