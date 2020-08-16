import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '../../elements/lib/Button';

interface Props {
  onPasswordRequestPress: () => void;
  onRegisterPress: () => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
  });

export const LoginFormFooter: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const {t} = useTranslation();
  const testIdForgotPassword = 'auth-loginFormFooter-forgotPassword';
  const testIdRegister = 'auth-loginFormFooter-register';
  return (
    <View style={styles.root}>
      <Button
        onPress={props.onPasswordRequestPress}
        variant="secondary"
        testID={testIdForgotPassword}
        link
        label={t('Forgot password?')}
      />
      <Button
        onPress={props.onRegisterPress}
        variant="primary"
        testID={testIdRegister}
        link
        label={t(`Don't have an account?`)}
      />
    </View>
  );
};
