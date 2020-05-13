export enum ResourceState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
}

export interface Resource<T> {
  data?: T | undefined;
  isProcessing: boolean;
  isLoaded: boolean;
  hasData: boolean;
  state: ResourceState;
}
