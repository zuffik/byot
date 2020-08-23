import {NativeAuth, Request, Response} from './NativeAuth';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {call} from 'redux-saga/effects';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {user} from '@byot-frontend/common/test/fixtures/dto/User';

describe('NativeAuth process', () => {
  let process: NativeAuth;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new NativeAuth();
    request = ProcessActionExtractor.dispatch(NativeAuth, {password: 'pass', userNameOrEmail: 'email'});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should login successfully', () => {
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
  });

  it('should fail login', () => {
    const generator = process.saga(request, {} as NativeAppState);
    generator.next();
    const response: GraphQLResponse<IAuth> = {
      success: false,
    };
    expect(generator.next(response).done).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());
});
