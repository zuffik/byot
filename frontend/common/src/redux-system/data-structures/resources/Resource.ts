export enum ResourceState {
  IDLE = 'IDLE',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
}

export interface Resource<T> {
  readonly data?: T | undefined;
  setData<D = T | undefined>(data: D): void;
  errors?: any;
  isProcessing: boolean;
  isLoaded: boolean;
  hasData: boolean;
  state: ResourceState;
  reset<R extends Resource<T>>(): R;
}
