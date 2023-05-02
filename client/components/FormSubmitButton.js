import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? 'rgba(164, 190, 123, 1)'
    : 'rgba(12, 128, 121, 1)';

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={{ fontSize: 18, color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormSubmitButton;