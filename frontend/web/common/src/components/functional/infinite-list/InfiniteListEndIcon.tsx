import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {MoreHorizRounded as EndOfListIcon} from '@material-ui/icons';
import {WithStyles} from '../../../types/WithStyles';
import {CSSProperties} from '@material-ui/styles';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.grey[300],
    textAlign: 'center',
    width: '100%',
  } as CSSProperties,
  icon: {
    fontSize: theme.typography.pxToRem(theme.spacing(8)),
  },
});
const useStyles = makeStyles(styles);

export const InfiniteListEndIcon: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <div className={styles.root}>
      <EndOfListIcon classes={{root: styles.icon}} />
    </div>
  );
};
