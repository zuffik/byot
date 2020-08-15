import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-ui-lib';
import {useTranslation} from 'react-i18next';

interface Props {}

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
  return (
    <View style={styles.root}>
      <Button variant="secondary" link label={t('Forgot password?')} />
      <Button variant="primary" link label={t(`Don't have an account?`)} />
    </View>
  );
};
