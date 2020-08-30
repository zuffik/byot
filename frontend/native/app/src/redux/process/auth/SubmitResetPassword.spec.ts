import {SubmitResetPassword, Request, Response} from './SubmitResetPassword';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {GraphQLError} from 'graphql';
import {NativeAppState} from '../../NativeAppState';
import {AlertOK} from '../../../types/alert/AlertOK';

describe('SubmitResetPassword process', () => {
  let process: SubmitResetPassword;
  let request: Action<Request>;
  let responseSuccess: Action<AsynchronousActionResponse<Request, Response>>;
  let responseError: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new SubmitResetPassword();
    request = ProcessActionExtractor.dispatch(SubmitResetPassword, {
      token: 'token',
      newPassword: 'newPass',
      passwordRepeat: 'passwordRepeats',
    });
    responseSuccess = ProcessActionExtractor.response(request, new GraphQLResponse());
    responseError = ProcessActionExtractor.response(request, new GraphQLResponse({}, [new GraphQLError('')]));
  });

  it('should handle successful response', () => {
    expect(process.handleResponse(responseSuccess, {} as NativeAppState, {} as NativeAppState)).toEqual(
      expect.objectContaining({
        alert: expect.any(AlertOK),
        navigation: {special: 'reset', name: 'Login'},
      })
    );
  });

  it('should handle failed response', () => {
    expect(process.handleResponse(responseError, {} as NativeAppState, {} as NativeAppState)).toEqual(
      expect.objectContaining({
        alert: expect.any(AlertOK),
      })
    );
  });

  afterEach(() => jest.clearAllMocks());
});
