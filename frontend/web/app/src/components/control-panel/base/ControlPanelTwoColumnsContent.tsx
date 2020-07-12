import * as React from 'react';
import {makeStyles, Theme, Grid} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';

interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

const styles = (theme: Theme) => ({
  mainColumn: {
    [theme.breakpoints.up('md')]: {
      paddingRight: '33%',
    },
  },
  secondaryColumn: {
    padding: theme.spacing(2),
    right: 0,
    top: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'fixed' as 'fixed',
      width: '25%',
    },
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelTwoColumnsContent: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <>
      <div className={styles.mainColumn}>{props.children}</div>
      <div className={styles.secondaryColumn}>{props.secondaryContent}</div>
    </>
  );
};
