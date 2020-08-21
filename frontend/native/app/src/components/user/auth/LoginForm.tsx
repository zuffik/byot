import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {TextField} from '../../elements/lib/TextField';
import {Formik} from 'formik';
import {Text, View} from 'react-native-ui-lib';
import {useTranslation} from 'react-i18next';
import {loginSchema} from '@byot-frontend/common/src/types/schemas/validation/LoginSchema';
import {Button} from '../../elements/lib/Button';

interface Props {
  onSubmit: (credentials: {usernameOrEmail: string; password: string}) => void;
  children?: React.ReactNode;
  loading?: boolean;
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
    <View accessibilityLabel={testIDRoot} testID={testIDRoot}>
      <Formik
        validationSchema={loginSchema(t)}
        validateOnBlur
        validateOnChange
        initialValues={{usernameOrEmail: '', password: ''}}
        onSubmit={c => props.onSubmit(c)}>
        {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
          <>
            <Text heading>{t('Login')!}</Text>
            <ScrollView>
              <View marginB-4>
                <TextField
                  placeholder={t('Username or email')}
                  value={values.usernameOrEmail}
                  onBlur={handleBlur('usernameOrEmail')}
                  onChangeText={handleChange('usernameOrEmail')}
                  keyboardType="email-address"
                  infoText
                  error={(touched.usernameOrEmail && errors.usernameOrEmail) as string}
                  testID={testIDUsernameEmail}
                  accessibilityLabel={testIDUsernameEmail}
                  autoCapitalize="none"
                />
              </View>
              <View marginB-4>
                <TextField
                  placeholder={t('Enter password')}
                  value={values.password}
                  secureTextEntry
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  style={styles.password}
                  infoText
                  error={(touched.password && errors.password) as string}
                  testID={testIDPassword}
                  accessibilityLabel={testIDPassword}
                  autoCapitalize="none"
                />
              </View>
              <Button loading={props.loading} onPress={handleSubmit} label={t('Login')} />
              {props.children}
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  );
};
