import {RequestResetPassword, Request, Response} from './RequestResetPassword';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {GraphQLError} from 'graphql';
import {NativeAppState} from '../../NativeAppState';
import {AlertOK} from '../../../types/alert/AlertOK';

describe('RequestResetPassword process', () => {
  let process: RequestResetPassword;
  let request: Action<Request>;
  let responseSuccess: Action<AsynchronousActionResponse<Request, Response>>;
  let responseError: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new RequestResetPassword();
    request = ProcessActionExtractor.dispatch(RequestResetPassword, {email: 'email'});
    responseSuccess = ProcessActionExtractor.response(request, new GraphQLResponse());
    responseError = ProcessActionExtractor.response(request, new GraphQLResponse({}, [new GraphQLError('')]));
  });

  it('should successfully request reset password', () => {
    expect(process.handleResponse(responseSuccess, {} as NativeAppState, {} as NativeAppState)).toEqual(
      expect.objectContaining({
        alert: expect.any(AlertOK),
        navigation: {special: 'back'},
      })
    );
  });

  it('should fail request reset password', () => {
    expect(process.handleResponse(responseSuccess, {} as NativeAppState, {} as NativeAppState)).toEqual(
      expect.objectContaining({
        alert: expect.any(AlertOK),
      })
    );
  });

  afterEach(() => jest.clearAllMocks());
});
