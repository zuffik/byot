import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {TripleComboItem} from './TripleComboItem';
import {PatchSkeleton} from '@byot-frontend/web-common/src/components/elementary/patch/PatchSkeleton';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  imagePlaceholder: {
    height: theme.spacing(8),
  },
  description: {},
});
const useStyles = makeStyles(styles);

export const TripleComboItemSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <TripleComboItem
      primary={<PatchSkeleton variant="rect" classes={{root: styles.title}} />}
      imagePlaceholder={<PatchSkeleton variant="rect" classes={{root: styles.imagePlaceholder}} />}
      description={<PatchSkeleton variant="rect" classes={{root: styles.description}} />}
    />
  );
};
