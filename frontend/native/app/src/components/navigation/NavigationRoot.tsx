import * as React from 'react';
import {useSelector} from 'react-redux';
import {NativeAppState} from '../../redux/NativeAppState';
import {UnauthorizedNavigation} from './UnauthorizedNavigation';
import {AuthorizedNavigationRoot} from './AuthorizedNavigationRoot';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../../navigation/Screens';

interface Props {}

export const NavigationRoot: React.FC<Props> = (props: Props) => {
  const auth = useSelector((state: NativeAppState) => state.auth);
  return <>{!!auth.data ? <AuthorizedNavigationRoot /> : <UnauthorizedNavigation />}</>;
};
