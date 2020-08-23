export interface NavigateToOptions {
  name: string;
  key: string;
  params?: Record<string, any>;
}

export interface NavigateSpecialOptions {
  special: 'back';
}

export type NavigateOptions = NavigateToOptions | NavigateSpecialOptions;
