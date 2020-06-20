import * as React from 'react';
import {Input} from '../elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '../elementary/form/Button';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TFunction} from 'i18next';
import {UserLogin} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {PlainLayoutNarrow} from '../plain-layout/PlainLayoutNarrow';
import {PlainLayoutTitle} from '../plain-layout/PlainLayoutTitle';

type Values = UserLogin;
const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    userNameOrEmail: Yup.string().required(t('Enter username or email')),
    password: Yup.string().required(t('Enter password')),
  });

interface Props {
  onLogin: (credentials: Values) => void;
  children?: React.ReactNode;
  loading?: boolean;
}

export const LoginForm: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();

  return (
    <PlainLayoutNarrow>
      <PlainLayoutTitle>{t('Login')}</PlainLayoutTitle>
      <Formik
        initialValues={{userNameOrEmail: '', password: ''}}
        onSubmit={values => props.onLogin(values)}
        validateOnChange
        validateOnBlur
        validationSchema={loginSchema(t)}>
        {({values, errors, touched, handleChange, handleBlur}) => (
          <Form data-testid="common-auth-login-form-form">
            <Input
              color="secondary"
              type="text"
              label={t('Username or email')}
              value={values.userNameOrEmail}
              onBlur={handleBlur('userNameOrEmail')}
              onChange={handleChange('userNameOrEmail')}
              name="userNameOrEmail"
              errorText={touched.userNameOrEmail && errors.userNameOrEmail}
              data-testid="common-auth-login-form-username"
            />
            <Input
              color="secondary"
              type="password"
              label={t('Password')}
              value={values.password}
              onBlur={handleBlur('password')}
              onChange={handleChange('password')}
              name="password"
              errorText={touched.password && errors.password}
              data-testid="common-auth-login-form-password"
            />
            <Button
              type="submit"
              color="gradient"
              data-testid="common-auth-login-form-button"
              fullWidth
              loading={props.loading}>
              {t('Login')}
            </Button>
            {props.children}
          </Form>
        )}
      </Formik>
    </PlainLayoutNarrow>
  );
};
