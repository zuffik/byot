import * as React from 'react';
import {useSelector} from 'react-redux';
import {NativeAppState} from '../../redux/NativeAppState';
import {UnauthorizedNavigation} from './UnauthorizedNavigation';
import {AuthorizedNavigationRoot} from './AuthorizedNavigationRoot';

interface Props {}

export const NavigationRoot: React.FC<Props> = (props: Props) => {
  const auth = useSelector((state: NativeAppState) => state.auth);
  console.log(!!auth.data);
  return <>{!!auth.data ? <AuthorizedNavigationRoot /> : <UnauthorizedNavigation />}</>;
};
