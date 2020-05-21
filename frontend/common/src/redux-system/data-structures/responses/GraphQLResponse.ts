import {DataResponse} from './DataResponse';
import {GraphQLError} from 'graphql';

export class GraphQLResponse<T> implements DataResponse<T, GraphQLError> {
  public status?: number = 200;
  constructor(public data?: T, public errors?: GraphQLError[]) {}

  public get success(): boolean {
    return !this.errors || this.errors.length == 0;
  }
}
