import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';
import {Logo} from '../elementary/Logo';
import {WithStyles} from '../../types/WithStyles';

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

const styles = (theme: Theme): StyleRules<Props> => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  header: {
    width: '100%',
  },
  logo: {
    height: 60,
    [theme.breakpoints.up('sm')]: {
      height: 100,
    },
  },
});
const useStyles = makeStyles(styles);

export const PlainLayout: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Logo classes={{img: styles.logo}} />
      </div>
      {props.children}
      <div />
    </div>
  );
};
