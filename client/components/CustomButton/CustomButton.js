import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CustomButton = ({ onPress, text, type, bgColor, fgColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      {text === 'Sign in with Google' && (
        <AntDesign
          name='google'
          size={20}
          color='black'
        />
      )}
      {text === 'Sign in with Apple ID' && (
        <MaterialCommunityIcons
          name='apple'
          size={20}
          color='black'
        />
      )}
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    backgroundColor: '#0c8079',
    padding: 10,
    marginVertical: 5,
  },
  container_TERTIARY: {
    marginBottom: 25,
  },

  container_SECONDARY: {
    backgroundColor: '#0c8079',
    padding: 10,
    marginVertical: 25,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_TERTIARY: {
    color: '#223827',
  },
});

export default CustomButton;
