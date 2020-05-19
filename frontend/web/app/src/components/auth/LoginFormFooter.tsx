import * as React from 'react';
import {Box, makeStyles, Theme, WithStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import {Router} from '@byot-frontend/web-common/src/router/Router';
import {Button} from '@byot-frontend/web-common/src/components/elementary/form/Button';
import {useTranslation} from 'react-i18next';

interface Props extends Partial<WithStyles<typeof styles>> {}

const styles = (theme: Theme): StyleRules<Props> => ({});
const useStyles = makeStyles(styles);

export const LoginFormFooter: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" mt={4}>
      <Button variant="text" component={Link} to={Router.resetPassword.URI()}>
        {t('Forgot password?')}
      </Button>
      <Button color="secondary" variant="text" component={Link} to={Router.register.URI()}>
        {t("Don't have an account?")}
      </Button>
    </Box>
  );
};
