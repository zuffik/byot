import * as React from 'react';
import {Box, makeStyles, Theme, Typography, WithStyles} from '@material-ui/core';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {Link} from 'react-router-dom';
import {Router} from '../../router/Router';
import {useTranslation} from 'react-i18next';

interface Props extends Partial<WithStyles<typeof styles>> {}

const styles = (theme: Theme) => ({
  alreadyHaveLabel: {
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(styles);

export const RegistrationFormFooter: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" mt={4}>
      <Typography classes={{root: styles.alreadyHaveLabel}}>{t('Already have an account?')}</Typography>
      <Button color="secondary" variant="text" component={Link} to={Router.login.URI()}>
        {t('Log in')}
      </Button>
    </Box>
  );
};
