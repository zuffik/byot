import * as React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

export const FullScreenKeyboardAvoiding: React.FC<Props> = (props: Props) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
      {props.children}
    </KeyboardAvoidingView>
  );
};
