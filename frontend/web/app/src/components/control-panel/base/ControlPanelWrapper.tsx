import * as React from 'react';
import {Grid, makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {ControlPanelHeader} from './ControlPanelHeader';
import {ControlPanelSidebar} from './ControlPanelSidebar';

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

const styles = (theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.grey[100],
    },
  },
  root: {
    height: '100vh',
  },
  content: {
    paddingLeft: '25%',
    paddingTop: theme.spacing(8),
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelWrapper: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <ControlPanelHeader />
      <ControlPanelSidebar />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
