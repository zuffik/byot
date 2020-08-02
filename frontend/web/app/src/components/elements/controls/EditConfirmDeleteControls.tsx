import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Theme,
  makeStyles,
} from '@material-ui/core';
import {EditDeleteControlsProps, EditDeleteControls} from './EditDeleteControls';
import {useTranslation} from 'react-i18next';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

interface Props extends EditDeleteControlsProps, WithStyles<typeof styles> {
  confirmationText?: React.ReactNode;
}

const styles = (theme: Theme) => ({
  yes: {
    color: theme.palette.error.main,
  },
});
const useStyles = makeStyles(styles);

export const EditConfirmDeleteControls: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const [open, setOpen] = React.useState<boolean>(false);
  const {t} = useTranslation();
  return (
    <>
      <EditDeleteControls onDeleteClick={() => setOpen(true)} editUrl={props.editUrl} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('Confirmation')}</DialogTitle>
        <DialogContent>
          {props.confirmationText || (
            <Typography>{t('Are you sure you want to delete this item?')}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setOpen(false)}
            data-testid="app-elements-controls-confirm-no">
            {t('No')}
          </Button>
          <Button
            classes={{root: styles.yes}}
            onClick={props.onDeleteClick}
            data-testid="app-elements-controls-confirm-yes">
            {t('Yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
