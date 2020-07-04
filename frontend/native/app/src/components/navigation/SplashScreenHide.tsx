import * as React from 'react';
import {useEffect} from 'react';
import * as setup from '../../setup';
import SplashScreen from 'react-native-splash-screen';

interface Props {}

interface State {}

export const SplashScreenHide: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    setup
      .init()
      .then(() => SplashScreen.hide())
      .catch(console.error);
  }, []);
  return null;
};
