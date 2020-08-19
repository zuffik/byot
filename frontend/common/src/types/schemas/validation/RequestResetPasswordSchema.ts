import {TFunction} from 'i18next';
import * as Yup from 'yup';

export const requestResetPasswordSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t('Enter email')).email(t('Enter valid email')),
  });
