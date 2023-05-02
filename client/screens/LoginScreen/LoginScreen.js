import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const validate = () => {
    let isValid = true;

    if (!user.email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!user.password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (user.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // const onLoginPressed = () => {
  //   //Validate the user in backend
  //   navigation.navigate('AppNav');
  // };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ResetPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  const handleChange = (value, field) => {
    setUser((prevState) => ({ ...prevState, [field]: value }));
  };

  const onLoginPressed = async ({ handleLogin }) => {
    if (!validate()) {
      return;
    }

    const { email, password } = user;
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const result = await response.json();
      AsyncStorage.setItem('token', result.token); // Save the user token to AsyncStorage
      // navigation.replace('AppNav');
      console.warn('Login successful');
    } else {
      const error = await response.text();
      alert(`Login failed: ${error}`);
    }
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
            {/* <Text style={styles.title}>Login</Text> */}
            <CustomInput
              placeholder='Email'
              value={user.email}
              onChangeText={(value) => handleChange(value, 'email')}
            />
            <CustomInput
              placeholder='Password'
              value={user.password}
              onChangeText={(value) => handleChange(value, 'password')}
              secureTextEntry={true}
            />

            <View style={styles.forgotpassword}>
              <CustomButton
                text='forgot password?'
                type='TERTIARY'
                onPress={onForgotPasswordPressed}
              />
            </View>

            <CustomButton
              text='LOGIN'
              type='PRIMARY'
              onPress={onLoginPressed}
            />

            <SocialSignInButtons />

            <View style={styles.signup}>
              <CustomButton
                text="Don't have an account? Sign up"
                type='TERTIARY'
                onPress={onSignUpPressed}
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
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#223827',
  },
  image: {
    width: '25%',
    maxWidth: 500,
    maxHeight: 300,
    marginTop: 20,
  },
  forgotpassword: {
    alignSelf: 'flex-end',
  },
  signup: {
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
