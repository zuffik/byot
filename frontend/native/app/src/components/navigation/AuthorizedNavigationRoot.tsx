import * as React from 'react';
import {AuthorizedNavigationTabs} from './AuthorizedNavigationTabs';

interface Props {}

export const AuthorizedNavigationRoot: React.FC<Props> = (props: Props) => {
  return <AuthorizedNavigationTabs />;
};
