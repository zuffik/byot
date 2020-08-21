import {SnackbarContent} from './SnackbarContent';

export abstract class BaseSnackbar implements SnackbarContent {
  protected constructor(
    public message: string,
    public type: 'success' | 'error' | 'info' | 'warning',
    public timeout: number = 7000
  ) {}
}
