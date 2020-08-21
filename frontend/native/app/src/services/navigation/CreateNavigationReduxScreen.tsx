import * as React from 'react';
import {NavigationReduxController} from '../../components/functional/NavigationReduxController';

export const createNavigationReduxScreen = (Component: React.ComponentType): React.ComponentType => () => (
  <>
    <NavigationReduxController />
    <Component />
  </>
);
