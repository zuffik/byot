import {SubmitResetPassword, Request} from './SubmitResetPassword';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {FrontendCommonState} from '../../FrontendCommonState';
import {GraphQLResponse} from '../../../redux-system/data-structures/responses/GraphQLResponse';
import {Action} from 'typescript-fsa';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';

describe('SubmitResetPassword', () => {
  let process: SubmitResetPassword;
  let request: Action<Request>;
  beforeEach(() => {
    request = ProcessActionExtractor.dispatch(SubmitResetPassword, {
      newPassword: 'password',
      passwordRepeat: 'password',
      token: 'token',
    });
    process = new SubmitResetPassword();
  });
  it('should handle request', () => {
    const state = process.handleRequest(request, {} as FrontendCommonState, {} as FrontendCommonState);
    expect(state.is.resettingPassword).toBeTruthy();
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
    expect(state.is.resettingPassword).toBeFalsy();
  });
});
