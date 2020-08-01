import * as React from 'react';
import {useDispatch} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {Logout} from '@byot-frontend/web-common/src/redux/process/auth/Logout';

interface Props {}

export const LogoutPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(Logout, {}));
  }, [dispatch]);
  return null;
};
