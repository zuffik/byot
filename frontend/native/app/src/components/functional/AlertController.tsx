import * as React from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeAppState} from '../../redux/NativeAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {AlertClear} from '../../redux/process/alert/AlertClear';

interface Props {}

export const AlertController: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const alert = useSelector((state: NativeAppState) => state.alert);
  React.useEffect(() => {
    if (alert) {
      Alert.alert(alert.title, alert.message, alert.buttons, alert.options);
      dispatch(ProcessActionExtractor.dispatch(AlertClear));
    }
  }, [alert]);
  return null;
};
