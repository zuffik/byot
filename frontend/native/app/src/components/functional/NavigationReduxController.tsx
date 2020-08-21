import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {NativeAppState} from '../../redux/NativeAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {NavigationClear} from '../../redux/process/controllers/NavigationClear';

interface Props {}

export const NavigationReduxController: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const navigate = useSelector((state: NativeAppState) => state.navigation);
  React.useEffect(() => {
    if (navigate) {
      nav.navigate(navigate);
      dispatch(ProcessActionExtractor.dispatch(NavigationClear, {}));
    }
  }, [navigate]);
  return null;
};
