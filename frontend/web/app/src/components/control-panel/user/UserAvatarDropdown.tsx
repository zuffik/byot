import * as React from 'react';
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  ListItemIcon,
} from '@material-ui/core';
import {KeyboardArrowDown, ExitToApp, VerifiedUser} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

interface Props extends WithStyles<typeof styles> {
  onLogout?: () => void;
}

const styles = (theme: Theme) => ({
  button: {
    borderRadius: theme.shape.borderRadius,
  },
});
const useStyles = makeStyles(styles);

export const UserAvatarDropdown: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  const [anchorElement, setAnchorElement] = React.useState<Element | null>(null);
  const setMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(e.currentTarget);
  };
  const setMenuClose = () => {
    setAnchorElement(null);
  };
  return (
    <>
      <Box px={2}>
        <ButtonBase
          data-testid="control-panel-user-avatar-dropdown-trigger"
          classes={{root: styles.button}}
          onClick={setMenuOpen}>
          <Box pr={1} display="flex" flexDirection="row" alignItems="center">
            <Avatar />
            <KeyboardArrowDown />
          </Box>
        </ButtonBase>
      </Box>
      <Menu
        open={!!anchorElement}
        data-testid="control-panel-user-avatar-dropdown-menu"
        onClose={setMenuClose}
        anchorEl={anchorElement}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <VerifiedUser fontSize="small" />
          </ListItemIcon>
          {t('Profile')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={props.onLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          {t('Log out')}
        </MenuItem>
      </Menu>
    </>
  );
};

/*
export const UserAvatarDropdownRedux: React.FC<Partial<Props>> = (props: Partial<Props>) => {
    const dispatch = useDispatch();
    const onLogout = () => dispatch(ProcessActionExtractor.dispatch(Logout, {}))
    return <UserAvatarDropdown {...props as Required<Props>} onLogout={onLogout}/>;
}
*/
