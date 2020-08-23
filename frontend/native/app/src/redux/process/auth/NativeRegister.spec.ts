import {NativeRegister, Request, Response} from './NativeRegister';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {call} from 'redux-saga/effects';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {user} from '@byot-frontend/common/test/fixtures/dto/User';
import {AlertOK} from '../../../types/alert/AlertOK';

describe('NativeRegister process', () => {
  let process: NativeRegister;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new NativeRegister();
    request = ProcessActionExtractor.dispatch(NativeRegister, {
      firstName: '',
      lastName: '',
      password: 'pass',
      email: 'email',
    });
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should register successfully', () => {
    const generator = process.saga(request, {} as NativeAppState);
    generator.next();
    const response: GraphQLResponse<IAuth> = {
      success: true,
      data: {
        token: 'token',
        user: user(),
      },
    };
    expect(generator.next(response).value).toEqual(call(nativeStorage.setItem, 'auth', response.data));
    expect(generator.next().done).toBeTruthy();
    expect(
      process.handleResponse(
        ProcessActionExtractor.response(request, response),
        {} as NativeAppState,
        {} as NativeAppState
      )
    ).toEqual(
      expect.objectContaining({
        navigation: expect.objectContaining({
          name: 'AuthLayout',
          key: 'AuthLayout',
        }),
      })
    );
  });

  it('should fail register', () => {
    const generator = process.saga(request, {} as NativeAppState);
    generator.next();
    const response: GraphQLResponse<IAuth> = {
      success: false,
    };
    expect(generator.next(response).done).toBeTruthy();
    expect(
      process.handleResponse(
        ProcessActionExtractor.response(request, response),
        {} as NativeAppState,
        {} as NativeAppState
      )
    ).toEqual(
      expect.objectContaining({
        alert: expect.any(AlertOK),
      })
    );
  });

  afterEach(() => jest.clearAllMocks());
});
