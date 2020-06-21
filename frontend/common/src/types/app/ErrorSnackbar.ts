import {BaseSnackbar} from './BaseSnackbar';

export class ErrorSnackbar extends BaseSnackbar {
  constructor(message: string, timeout?: number) {
    super(message, 'error', timeout);
  }
}
