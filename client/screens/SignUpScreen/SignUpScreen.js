import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Logo from '../../assets/logo2.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = (setIsLoggedIn) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail');
  };

  const onTermsPressed = () => {
    console.warn('Terms of Use');
  };

  const onPrivacyPressed = () => {
    console.warn('Privacy policy');
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
            <Image
              source={Logo}
              style={[styles.image, { height: height * 0.3 }]}
              resizeMode='contain'
            />

            <Text style={styles.title}>Set up an account</Text>

            <CustomInput
              placeholder='Name'
              value={name}
              setValue={setName}
            />

            <CustomInput
              placeholder='Email'
              value={email}
              setValue={setEmail}
            />

            <CustomInput
              placeholder='Password'
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />

            <CustomInput
              placeholder='Confirm password'
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry={true}
            />

            <CustomButton
              text='REGISTER'
              type='SECONDARY'
              onPress={onRegisterPressed}
            />

            <Text style={styles.text}>
              By registering, you confirm that you accept our{' '}
              <Text
                style={styles.link}
                onPress={onTermsPressed}>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text
                style={styles.link}
                onPress={onPrivacyPressed}>
                Privacy Policy
              </Text>
            </Text>

            <SocialSignInButtons />

            <View style={styles.signup}>
              <CustomButton
                text='Have an account? Sign in'
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
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#223827',
    margin: 25,
  },
  image: {
    width: '20%',
    maxWidth: 500,
    maxHeight: 100,
  },
  text: {
    color: 'grey',
    marginBottom: 40,
  },
  link: {
    color: '#223827',
  },
  signup: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
