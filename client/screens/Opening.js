import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function Opening() {
  return (
    <View style={StyleSheet.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c8079',
  },
  image: {
    width: 240,
    height: 240,
  },
});

export default Opening;
