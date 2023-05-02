import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppNav from '../screens/AppNav';
const Home = () => {
  return <AppNav />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
