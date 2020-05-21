import {DataResponse} from './DataResponse';

export class GraphQLResponse<T> implements DataResponse<T> {
  constructor(
    public data?: T,
    // todo get error from apollo
    public error?: string
  ) {}

  public get success(): boolean {
    return !this.error;
  }
}
