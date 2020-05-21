export enum ResourceState {
  IDLE = 'IDLE',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
}

export interface Resource<T> {
  data?: T | undefined;
  errors?: any;
  isProcessing: boolean;
  isLoaded: boolean;
  hasData: boolean;
  state: ResourceState;
}
