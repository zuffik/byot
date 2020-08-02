import * as React from 'react';
import {Box, makeStyles, Theme} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {PatchSkeleton} from '@byot-frontend/web-common/src/components/elementary/patch/PatchSkeleton';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  skeleton: {
    width: '100%',
    height: theme.spacing(8),
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelTitleSkeleton: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <Box mb={4} mt={2}>
      <PatchSkeleton variant="rect" classes={{root: styles.skeleton}} />
    </Box>
  );
};
