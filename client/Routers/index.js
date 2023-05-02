import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import AppForm from '../components/AppForm';
import MainNavigator from '../components/MainNavigator';

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Start'
        component={StartScreen}
      />
      <Stack.Screen
        name='AppForm'
        component={AppForm}
      />
      <Stack.Screen
        name='MainNavigator'
        component={MainNavigator}
      />
    </Stack.Navigator>
  );
};
export default Routers;
