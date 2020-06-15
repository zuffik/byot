import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {TextField} from '../../elements/text-field/TextField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../../elements/button/Button';
import {useTranslation} from '../../../i18n/UseTranslation';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required(),
  password: Yup.string().required(),
});

interface Props {
  onSubmit: (credentials: {usernameOrEmail: string; password: string}) => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      maxWidth: 400,
      width: '100%',
    },
    heading: {
      marginBottom: 30,
    },
    password: {
      marginBottom: 48,
    },
  });

export const LoginForm: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const {t} = useTranslation();
  const testIDRoot = 'loginForm-root';
  const testIDUsernameEmail = 'loginForm-usernameEmail-input';
  const testIDPassword = 'loginForm-password-input';
  return (
    <View style={styles.root} testID={testIDRoot} accessibilityLabel={testIDRoot}>
      <View style={styles.form}>
        <Formik
          validationSchema={LoginSchema}
          validateOnBlur
          validateOnChange
          initialValues={{usernameOrEmail: '', password: ''}}
          onSubmit={c => props.onSubmit(c)}>
          {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
            <>
              <Text category="h1" style={styles.heading}>
                {t('Login')!}
              </Text>
              <TextField
                placeholder={t('Username or email')}
                withHelperText="danger"
                value={values.usernameOrEmail}
                onBlur={handleBlur('usernameOrEmail')}
                onChangeText={handleChange('usernameOrEmail')}
                keyboardType="email-address"
                helperText={
                  touched.usernameOrEmail && errors.usernameOrEmail ? t('Enter username or email') : undefined
                }
                testID={testIDUsernameEmail}
                accessibilityLabel={testIDUsernameEmail}
              />
              <TextField
                placeholder={t('Enter password')}
                withHelperText="danger"
                value={values.password}
                secureTextEntry
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                style={styles.password}
                helperText={touched.password && errors.password ? t('Enter password') : undefined}
                testID={testIDPassword}
                accessibilityLabel={testIDPassword}
              />
              <Button onPress={handleSubmit} color="gradient">
                {t('Login')!}
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
