import * as React from 'react';
import {Box, makeStyles, Theme, Typography, WithStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';
import {Input} from '../elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '../elementary/form/Button';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {TFunction} from 'i18next';

type Values = {username: string; password: string};
const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    username: Yup.string().required(t('Enter username or email')),
    password: Yup.string().required(t('Enter password')),
  });

interface Props extends Partial<WithStyles<typeof styles>> {
  onLogin: (credentials: Values) => void;
  children?: React.ReactNode;
  loading?: boolean;
}

const styles = (theme: Theme): StyleRules<Props> => ({
  root: {
    maxWidth: 400,
    width: '100%',
  },
});
const useStyles = makeStyles(styles);

export const LoginForm: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();

  return (
    <div className={styles.root}>
      <Box mb={10}>
        <Typography variant="h3">{t('Login')}</Typography>
      </Box>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={values => props.onLogin(values)}
        validateOnChange
        validationSchema={loginSchema(t)}
      >
        {({values, errors, touched, handleChange, handleBlur}) => (
          <Form data-testid="common-auth-login-form-form">
            <Input
              color="secondary"
              type="text"
              label={t('Username or email')}
              value={values.username}
              onBlur={handleBlur('username')}
              onChange={handleChange('username')}
              errorText={touched.username && errors.username}
              data-testid="common-auth-login-form-username"
            />
            <Input
              color="secondary"
              type="password"
              label={t('Password')}
              value={values.password}
              onBlur={handleBlur('password')}
              onChange={handleChange('password')}
              errorText={touched.password && errors.password}
              data-testid="common-auth-login-form-password"
            />
            <Button type="submit" color="gradient" fullWidth loading={props.loading}>
              {t('Login')}
            </Button>
            {props.children}
          </Form>
        )}
      </Formik>
    </div>
  );
};