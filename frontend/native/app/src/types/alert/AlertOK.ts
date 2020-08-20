import {AlertOptions} from './AlertOptions';
import {AlertButton, AlertOptions as NativeAlertOptions} from 'react-native';

export class AlertOK implements AlertOptions {
  public buttons: AlertButton[];
  public options: NativeAlertOptions;

  constructor(
    public title: string,
    public message?: string,
    options: Omit<AlertOptions, 'title' | 'message'> = {}
  ) {
    this.buttons = [{text: 'OK'}, ...(options.buttons || [])];
    this.options = {
      ...(options.options || {}),
    };
  }
}
