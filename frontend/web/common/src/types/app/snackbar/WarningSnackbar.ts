import {BaseSnackbar} from './BaseSnackbar';

export class WarningSnackbar extends BaseSnackbar {
  constructor(message: string, timeout?: number) {
    super(message, 'warning', timeout);
  }
}
