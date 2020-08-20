import {AlertButton, AlertOptions as NativeAlertOptions} from 'react-native';

export interface AlertOptions {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  options?: NativeAlertOptions;
}
