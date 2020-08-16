import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '../../elements/lib/Button';
import {Colors, Text} from 'react-native-ui-lib';

interface Props {
  onLogInPress: () => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    haveAccount: {
      color: Colors.grey50,
      marginTop: 12,
    },
  });

export const RegistrationFormFooter: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <Text style={styles.haveAccount}>{t('Already have an account?')}</Text>
      <Button onPress={props.onLogInPress} variant="primary" link label={t(`Log in`)} />
    </View>
  );
};
