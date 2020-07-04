import * as React from 'react';
import {makeStyles, Theme, List} from '@material-ui/core';
import {Home} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {DrawerMenuItem} from './DrawerMenuItem';

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const DrawerMenu: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <List disablePadding>
      <DrawerMenuItem icon={<Home />} link="/">
        asdlfkjsd
      </DrawerMenuItem>
    </List>
  );
};
