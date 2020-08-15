import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextField} from '../../elements/text-field/TextField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Text, View} from 'react-native-ui-lib';
import {useTranslation} from 'react-i18next';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required(),
  password: Yup.string().required(),
});

interface Props {
  onSubmit: (credentials: {usernameOrEmail: string; password: string}) => void;
  children?: React.ReactNode;
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
              <Text heading style={styles.heading}>
                {t('Login')!}
              </Text>
              <View marginB-4>
                <TextField
                  placeholder={t('Username or email')}
                  withHelperText="danger"
                  value={values.usernameOrEmail}
                  onBlur={handleBlur('usernameOrEmail')}
                  onChangeText={handleChange('usernameOrEmail')}
                  keyboardType="email-address"
                  infoText
                  error={
                    touched.usernameOrEmail && errors.usernameOrEmail
                      ? t('Enter username or email')
                      : undefined
                  }
                  testID={testIDUsernameEmail}
                  accessibilityLabel={testIDUsernameEmail}
                  autoCapitalize="none"
                />
              </View>
              <View marginB-4>
                <TextField
                  placeholder={t('Enter password')}
                  withHelperText="danger"
                  value={values.password}
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  style={styles.password}
                  infoText
                  error={touched.password && errors.password ? t('Enter password') : undefined}
                  testID={testIDPassword}
                  accessibilityLabel={testIDPassword}
                  autoCapitalize="none"
                />
              </View>
              <Button onPress={handleSubmit} label={t('Login')} />
              {props.children}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
