import * as React from 'react';
import {makeStyles, Theme, IconButtonProps, IconButton} from '@material-ui/core';
import {DeleteRounded} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {CombineClasses} from '@byot-frontend/web-common/src/types/CombineClasses';

interface Props extends CombineClasses<WithStyles<typeof styles>, IconButtonProps> {}

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.error.main,
  },
});
const useStyles = makeStyles(styles);

export const ButtonRemove: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <IconButton {...props} classes={{...props.classes, root: styles.root}}>
      {props.children || <DeleteRounded />}
    </IconButton>
  );
};
