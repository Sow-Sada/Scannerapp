import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('NewPassword');
  };

  const onSignInPressed = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
              placeholder='Email'
              value={email}
              setValue={setEmail}
            />

            <CustomButton
              text='SEND'
              type='SECONDARY'
              onPress={onSendPressed}
            />

            <View style={styles.confirm}>
              <CustomButton
                text='Back to login'
                type='TERTIARY'
                onPress={onSignInPressed}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#223827',
    paddingTop: 45,
    paddingBottom: 25,
  },
  confirm: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ResetPasswordScreen;
