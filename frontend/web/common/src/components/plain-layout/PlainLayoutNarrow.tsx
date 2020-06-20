import * as React from 'react';
import {makeStyles, Theme, WithStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/styles';

interface Props extends Partial<WithStyles<typeof styles>> {
  children: React.ReactNode;
}

const styles = (theme: Theme): StyleRules<Props> => ({
  root: {
    maxWidth: 400,
    width: '100%',
  },
});
const useStyles = makeStyles(styles);

export const PlainLayoutNarrow: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return <div className={styles.root}>{props.children}</div>;
};
