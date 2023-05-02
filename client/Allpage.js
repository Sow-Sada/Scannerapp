import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './components/MainNavigator';
import LoginProvider from './Context/LoginProvider';
import StartScreen from './screens/StartScreen';
const Allpage = () => {
  //const isLoggedIn = false;

  return (
    <>
      <LoginProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </LoginProvider>
    </>
  );
};
export default Allpage;
