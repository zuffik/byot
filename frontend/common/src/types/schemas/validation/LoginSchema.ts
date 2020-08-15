import * as Yup from 'yup';
import {TFunction} from 'i18next';

export const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    usernameOrEmail: Yup.string().required(t('Enter username or email')),
    password: Yup.string().required(t('Enter password')),
  });
