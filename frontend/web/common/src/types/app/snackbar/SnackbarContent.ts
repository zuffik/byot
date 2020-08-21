export interface SnackbarContent {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout?: number;
}
