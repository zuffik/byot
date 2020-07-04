import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {DrawerMenu} from '../drawer/DrawerMenu';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    left: 0,
    top: theme.spacing(8),
    width: '25%',
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelSidebar: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <DrawerMenu />
    </div>
  );
};
