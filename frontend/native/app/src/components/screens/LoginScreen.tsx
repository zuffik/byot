import * as React from 'react';
import {LoginForm} from '../user/auth/LoginForm';
import {LoginFormFooter} from '../user/auth/LoginFormFooter';
import {FullScreenKeyboardAvoiding} from './FullScreenKeyboardAvoiding';
import {PlainLayoutNarrow} from '../plain-layout/PlainLayoutNarrow';

interface Props {
  onLogin: (credentials: {username: string; password: string}) => void;
}

export const LoginScreen: React.FC<Props> = (props: Props) => {
  return (
    <FullScreenKeyboardAvoiding>
      <PlainLayoutNarrow>
        <LoginForm onSubmit={console.log}>
          <LoginFormFooter />
        </LoginForm>
      </PlainLayoutNarrow>
    </FullScreenKeyboardAvoiding>
  );
};
