import {BaseSnackbar} from './BaseSnackbar';

export class InfoSnackbar extends BaseSnackbar {
  constructor(message: string, timeout?: number) {
    super(message, 'info', timeout);
  }
}
