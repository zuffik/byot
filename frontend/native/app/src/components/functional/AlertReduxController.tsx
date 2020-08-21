import * as React from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeAppState} from '../../redux/NativeAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {AlertClear} from '../../redux/process/controllers/AlertClear';
import {useTranslation} from 'react-i18next';

interface Props {}

export const AlertReduxController: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const alert = useSelector((state: NativeAppState) => state.alert);
  React.useEffect(() => {
    if (alert) {
      Alert.alert(
        t(alert.title),
        t(alert.message || ''),
        alert.buttons?.map(button => ({...button, text: t(button.text || '')})) || [],
        alert.options
      );
      dispatch(ProcessActionExtractor.dispatch(AlertClear));
    }
  }, [alert]);
  return null;
};
