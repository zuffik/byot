import * as React from 'react';
import {RegistrationForm} from '@byot-frontend/web-common/src/components/auth/RegistrationForm';
import {RegistrationFormFooter} from '../auth/RegistrationFormFooter';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebAppState} from '../../redux/WebAppState';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';
import {WebRegister} from '@byot-frontend/web-common/src/redux/process/auth/WebRegister';

interface Props {}

export const RegistrationFormPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const onRegister = (register: IUserRegister) =>
    dispatch(ProcessActionExtractor.dispatch(WebRegister, register));
  const resource = useSelector((state: WebAppState) => state.auth);
  return (
    <RegistrationForm onRegister={onRegister} loading={resource.isProcessing}>
      <RegistrationFormFooter />
    </RegistrationForm>
  );
};
