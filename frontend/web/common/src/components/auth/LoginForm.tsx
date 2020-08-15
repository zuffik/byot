import * as React from 'react';
import {Input} from '../elementary/form/Input';
import {Button} from '../elementary/form/Button';
import {Form, Formik} from 'formik';
import {UserLogin} from '@byot/common/graphql/ts/types';
import {PlainLayoutNarrow} from '../plain-layout/PlainLayoutNarrow';
import {PlainLayoutTitle} from '../plain-layout/PlainLayoutTitle';
import {useTranslation} from 'react-i18next';
import {Grid} from '@material-ui/core';
import {loginSchema} from '@byot-frontend/common/src/types/schemas/validation/LoginSchema';

type Values = UserLogin;

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  color="secondary"
                  type="text"
                  label={t('Username or email')}
                  value={values.userNameOrEmail}
                  onBlur={handleBlur('userNameOrEmail')}
                  onChange={handleChange('userNameOrEmail')}
                  name="userNameOrEmail"
                  error={!!(touched.userNameOrEmail && errors.userNameOrEmail)}
                  helperText={touched.userNameOrEmail && errors.userNameOrEmail}
                  data-testid="common-auth-login-form-username"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  color="secondary"
                  type="password"
                  label={t('Password')}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChange={handleChange('password')}
                  name="password"
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  data-testid="common-auth-login-form-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  data-testid="common-auth-login-form-button"
                  fullWidth
                  loading={props.loading}>
                  {t('Login')}
                </Button>
              </Grid>
            </Grid>
            {props.children}
          </Form>
        )}
      </Formik>
    </PlainLayoutNarrow>
  );
};
