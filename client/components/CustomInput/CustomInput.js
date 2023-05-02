import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const CustomInput = ({ placeholder, secureTextEntry }) => {
  const [value, setValue] = useState('');

  const handleChange = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={secureTextEntry}
        returnKeyType='done'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  input: {},
});

export default CustomInput;
