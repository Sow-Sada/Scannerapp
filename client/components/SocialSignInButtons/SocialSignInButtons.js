import React from 'react';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
  const onLoginGoogle = () => {
    console.warn('Login google');
  };

  const onLoginApple = () => {
    console.warn('Login apple');
  };

  return (
    <>
      <CustomButton
        text='Sign in with Google'
        type='PRIMARY'
        bgColor='#FAE9EA'
        fgColor='#DD4D44'
        onPress={onLoginGoogle}
      />

      <CustomButton
        text='Sign in with Apple ID'
        type='PRIMARY'
        bgColor='#e3e3e3'
        fgColor='#363636'
        onPress={onLoginApple}
      />
    </>
  );
};

export default SocialSignInButtons;
