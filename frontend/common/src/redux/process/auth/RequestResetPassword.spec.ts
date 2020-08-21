import {RequestResetPassword, Request} from './RequestResetPassword';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {FrontendCommonState} from '../../FrontendCommonState';
import {GraphQLResponse} from '../../../redux-system/data-structures/responses/GraphQLResponse';
import {Action} from 'typescript-fsa';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';

describe('RequestResetPassword', () => {
  let process: RequestResetPassword;
  let request: Action<Request>;
  beforeEach(() => {
    request = ProcessActionExtractor.dispatch(RequestResetPassword, {email: 'email'});
    process = new RequestResetPassword();
  });
  it('should handle request', () => {
    const state = process.handleRequest(request, {} as FrontendCommonState, {} as FrontendCommonState);
    expect(state.is.requestingPasswordReset).toBeTruthy();
  });
  it('should pass saga', () => {
    const generator = process.saga(request, {} as FrontendCommonState);
    expect(generator.next().value).toEqual(call(ApolloContext.apolloClient.mutate, expect.any(Object)));
  });
  it('should handle response', () => {
    const state = process.handleResponse(
      ProcessActionExtractor.response(request, new GraphQLResponse()),
      {} as FrontendCommonState,
      {} as FrontendCommonState
    );
    expect(state.is.requestingPasswordReset).toBeFalsy();
  });
});
