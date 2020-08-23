import * as React from 'react';
import * as setup from '../../setup';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {LocalAuth} from '../../redux/process/auth/LocalAuth';
import {NativeAppState} from '../../redux/NativeAppState';

interface Props {
  children?: React.ReactNode;
}

const completeCycle = 4;

export const SplashScreenHide: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [init, setInit] = React.useState<number>(0);
  const auth = useSelector((state: NativeAppState) => state.auth);
  const increment = () => setInit(i => i + 1);
  React.useEffect(() => {
    // false -> true -> false => increment by 3
    increment();
  }, [auth.isProcessing]);
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(LocalAuth, {}));
    setup.init().then(increment).catch(console.error);
  }, []);
  React.useEffect(() => {
    if (init == completeCycle) {
      SplashScreen.hide();
    }
  }, [init]);
  if (init >= completeCycle) {
    return props.children as React.ReactElement;
  }
  return null;
};
