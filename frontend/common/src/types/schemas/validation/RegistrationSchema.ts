import {TFunction} from 'i18next';
import * as Yup from 'yup';

export const registrationSchema = (t: TFunction, password: string) =>
  Yup.object().shape({
    email: Yup.string().email(t('Enter valid email')).required(t('Enter email')),
    password: Yup.string()
      .required(t('Enter password'))
      .min(8, t('Password must be longer than 8 characters'))
      .matches(/[^A-Za-z0-9]+/, t('Password must contain at least one special character')),
    passwordRepeat: Yup.string()
      .required(t('Confirm password'))
      .oneOf([password], t('Passwords are not the same')),
    consent: Yup.boolean()
      .required(t('You have to agree with our terms and conditions'))
      .test('consent', t('You have to agree with our terms and conditions'), value => value === true),
  });
