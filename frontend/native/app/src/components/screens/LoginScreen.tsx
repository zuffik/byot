import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LoginForm} from '../user/auth/LoginForm';
import {Layout} from '../elements/layout/Layout';
import {Logo} from '../elements/logo/Logo';
import {LoginFormFooter} from '../user/auth/LoginFormFooter';

interface Props {
  onLogin: (credentials: {username: string; password: string}) => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      padding: 20,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });

export const LoginScreen: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  return (
    <Layout style={styles.root}>
      <Logo />
      <LoginForm onSubmit={props.onLogin} />
      <LoginFormFooter />
    </Layout>
  );
};

export const LoginScreenRedux: React.FC<Partial<Props>> = (props: Partial<Props>) => {
  return <LoginScreen {...(props as any)} onLogin={c => console.log(c)} />;
};
