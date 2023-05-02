import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen/LoginScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../ConfirmEmailScreen/ConfirmEmailScreen';
import NewPasswordScreen from '../NewPasswordScreen/NewPasswordScreen';
import ResetPasswordScreen from '../ResetPasswordScreen/ResetPasswordScreen';
import LoginForm from '../../components/LoginForm';

const Stack = createStackNavigator();

const AuthNav = ({ handleLogin }) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#eef2e6' },
        }}>
        <Stack.Screen
          name='Login'
          component={LoginForm}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
        />
        <Stack.Screen
          name='ConfirmEmail'
          component={ConfirmEmailScreen}
        />
        <Stack.Screen
          name='NewPassword'
          component={NewPasswordScreen}
        />
        <Stack.Screen
          name='ResetPassword'
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNav;
