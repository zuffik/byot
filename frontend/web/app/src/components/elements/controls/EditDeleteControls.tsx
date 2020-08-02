import * as React from 'react';
import {Grid, IconButton, makeStyles, Theme, Tooltip, CircularProgress} from '@material-ui/core';
import {DeleteRounded, EditRounded} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export interface EditDeleteControlsProps {
  editUrl: string;
  onDeleteClick: () => void;
  isRemoving?: boolean;
}

interface Props extends WithStyles<typeof styles>, EditDeleteControlsProps {}

const styles = (theme: Theme) => ({
  remove: {
    color: theme.palette.error.main,
  },
});
const useStyles = makeStyles(styles);

export const EditDeleteControls: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();

  return (
    <Grid container spacing={1} justify="flex-end">
      <Grid item>
        <Tooltip title={t('Edit') as string}>
          <IconButton
            color="primary"
            component={Link}
            to={props.editUrl}
            data-testid="app-elements-controls-edit">
            <EditRounded />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={t('Delete') as string}>
          <IconButton
            classes={{root: styles.remove}}
            onClick={props.onDeleteClick}
            disabled={props.isRemoving}
            data-testid="app-elements-controls-remove">
            {props.isRemoving ? (
              <CircularProgress size={24} classes={{root: styles.remove}} />
            ) : (
              <DeleteRounded />
            )}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
