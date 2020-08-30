export interface NavigateToOptions {
  name: string;
  key: string;
  params?: Record<string, any>;
}

export interface NavigateSpecialOptions {
  special: 'back' | 'reset';
  name?: string;
}

export type NavigateOptions = NavigateToOptions | NavigateSpecialOptions;
