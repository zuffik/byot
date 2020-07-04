import * as React from 'react';
import {makeStyles, Theme, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Link} from 'react-router-dom';

interface Props extends WithStyles<typeof styles> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  link: string;
}

const styles = (theme: Theme) => ({});
const useStyles = makeStyles(styles);

export const DrawerMenuItem: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  return (
    <ListItem button component={Link} to={props.link}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.children} />
    </ListItem>
  );
};
