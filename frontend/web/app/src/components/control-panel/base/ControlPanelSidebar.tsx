import * as React from 'react';
import {makeStyles, Theme, Box} from '@material-ui/core';
import {ExitToAppRounded} from '@material-ui/icons';
import {WithStyles} from '@byot-frontend/web-common/src/types/WithStyles';
import {DrawerMenu} from '../drawer/DrawerMenu';
import {Logo} from '@byot-frontend/web-common/src/components/elementary/logo/Logo';
import {Copyright} from '@byot-frontend/web-common/src/components/content/Copyright';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {useTranslation} from 'react-i18next';
import {Router} from '../../../router/Router';

interface Props extends WithStyles<typeof styles> {
  menuItems: LinkMenuItem[];
  selected?: string;
}

const styles = (theme: Theme) => ({
  root: {
    position: 'fixed' as 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    padding: theme.spacing(2),
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    width: '100%',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '33%',
    },
    [theme.breakpoints.up('md')]: {
      width: '25%',
    },
  },
});
const useStyles = makeStyles(styles);

export const ControlPanelSidebar: React.FC<Props> = (props: Props) => {
  const styles = useStyles(props);
  const {t} = useTranslation();
  return (
    <div className={styles.root}>
      <Logo height={64} />
      <DrawerMenu menu={props.menuItems} selected={props.selected} />
      <Box width="100%" textAlign="center">
        <DrawerMenu
          disablePadding
          menu={[
            {
              label: t('Log out'),
              link: Router.logout.URI(),
              id: 'logout',
              icon: <ExitToAppRounded />,
            },
          ]}
        />
        <Copyright />
      </Box>
    </div>
  );
};
