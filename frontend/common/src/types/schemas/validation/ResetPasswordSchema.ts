import {TFunction} from 'i18next';
import * as Yup from 'yup';

export const resetPasswordSchema = (t: TFunction, password: string) =>
  Yup.object().shape({
    newPassword: Yup.string()
      .required(t('Enter password'))
      .min(8, t('Password must be longer than 8 characters'))
      .matches(/[^A-Za-z0-9]+/, t('Password must contain at least one special character')),
    passwordRepeat: Yup.string()
      .required(t('Confirm password'))
      .oneOf([password], t('Passwords are not the same')),
  });
