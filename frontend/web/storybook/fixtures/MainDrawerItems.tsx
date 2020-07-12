import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {HomeRounded, PowerOffRounded, SettingsRounded} from '@material-ui/icons';
import * as React from 'react';

export const mainDrawerItems: LinkMenuItem[] = [
  {
    label: 'Home',
    icon: <HomeRounded />,
    id: 'home',
    link: '/',
  },
  {
    label: 'Settings',
    icon: <SettingsRounded />,
    id: 'settings',
    link: '/settings',
  },
  {
    label: 'Log out',
    icon: <PowerOffRounded />,
    id: 'logout',
    link: '/logout',
  },
];
