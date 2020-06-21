import {BaseSnackbar} from './BaseSnackbar';

export class SuccessSnackbar extends BaseSnackbar {
  constructor(message: string, timeout?: number) {
    super(message, 'success', timeout);
  }
}
