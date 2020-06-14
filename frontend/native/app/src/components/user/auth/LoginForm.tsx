import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {TextField} from '../../elements/text-field/TextField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../../elements/button/Button';
import {useTranslation} from '../../../i18n/UseTranslation';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

interface Props {
  onSubmit: (credentials: {username: string; password: string}) => void;
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
  return (
    <View style={styles.root}>
      <View style={styles.form}>
        <Formik
          validationSchema={LoginSchema}
          validateOnBlur
          initialValues={{username: '', password: ''}}
          onSubmit={props.onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
            <>
              <Text category="h1" style={styles.heading}>
                {t('Login')}
              </Text>
              <TextField
                placeholder={t('Username or email')}
                withHelperText="danger"
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
                keyboardType="email-address"
                helperText={touched.username && errors.username ? t('Enter username or email') : undefined}
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
              />
              <Button onPress={handleSubmit} color="gradient">
                {t('Login')}
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
