import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../elements/button/Button';
import {useTranslation} from '../../../i18n/UseTranslation';

interface Props {}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export const LoginFormFooter: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <Button appearance="ghost" color="basic">
        {t('Forgot password?')}
      </Button>
      <Button appearance="ghost" color="primary">
        {t(`Don't have an account?`)}
      </Button>
    </View>
  );
};
