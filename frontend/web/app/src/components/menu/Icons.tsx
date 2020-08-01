import * as React from 'react';

import {HomeRounded, AddRounded, FaceRounded} from '@material-ui/icons';

export const menuIcons = {
  Home: <HomeRounded />,
  CreateTrainingSet: <AddRounded />,
  Profile: <FaceRounded />,
};

export type MenuIcons = keyof typeof menuIcons;
