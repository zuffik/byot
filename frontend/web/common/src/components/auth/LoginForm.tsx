import * as React from 'react';
import {Box, makeStyles, Theme, Typography, WithStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';
import {Input} from '../elementary/form/Input';
import {useTranslation} from 'react-i18next';
import {Button} from '../elementary/form/Button';

interface Props extends Partial<WithStyles<typeof styles>> {}

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
      <Input color="secondary" type="email" label={t('Username or email')} />
      <Input color="secondary" type="password" label={t('Password')} />
      <Button color="gradient" fullWidth>
        {t('Login')}
      </Button>
    </div>
  );
};
