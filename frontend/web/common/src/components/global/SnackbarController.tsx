import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {WebState} from '../../redux/WebState';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebAuth} from '../../redux/process/auth/WebAuth';
import {makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '../../types/WithStyles';
import {useTranslation} from '@byot-frontend/common/src/i18n/UseTranslation';

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
}

const styles = (theme: Theme) => ({
  snackbar: {
    borderRadius: theme.spacing(1),
  },
});
const useStyles = makeStyles(styles);

const Child: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const snackbar = useSelector((state: WebState) => state.snackbar);
  React.useEffect(() => {
    if (snackbar) {
      enqueueSnackbar(t(snackbar.message), {
        autoHideDuration: snackbar.timeout,
        variant: snackbar.type,
        ContentProps: {classes: {root: styles.snackbar}},
      });
    }
  }, [snackbar, enqueueSnackbar, styles, t]);
  return <>{props.children}</>;
};

export const SnackbarController: React.FC<Props> = (props: Props) => {
  return (
    <SnackbarProvider maxSnack={5}>
      <Child {...props} />
    </SnackbarProvider>
  );
};
