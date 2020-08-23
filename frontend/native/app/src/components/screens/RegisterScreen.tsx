import * as React from 'react';
import {RegistrationForm} from '../user/auth/RegistrationForm';
import {RegistrationFormFooter} from '../user/auth/RegistrationFormFooter';
import {useNavigation} from '@react-navigation/native';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';
import {NativeRegister} from '../../redux/process/auth/NativeRegister';
import {NativeAppState} from '../../redux/NativeAppState';

interface Props {}

export const RegisterScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const loading = useSelector((state: NativeAppState) => state.auth.isProcessing);
  const onRegister = (values: IUserRegister) =>
    dispatch(ProcessActionExtractor.dispatch(NativeRegister, values));
  const onLogInPress = () => nav.goBack();
  return (
    <PlainLayoutInner>
      <RegistrationForm loading={loading} onRegister={onRegister}>
        <RegistrationFormFooter onLogInPress={onLogInPress} />
      </RegistrationForm>
    </PlainLayoutInner>
  );
};
