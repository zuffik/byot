import {Logout, Request, Response} from './Logout';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {GraphQLError} from 'graphql';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {call} from 'redux-saga/effects';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';
import {user} from '@byot-frontend/common/test/fixtures/dto/User';

describe('Logout process', () => {
  let process: Logout;
  let request: Action<Request>;
  let responseSuccess: Action<AsynchronousActionResponse<Request, Response>>;
  let responseError: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new Logout();
    request = ProcessActionExtractor.dispatch(Logout, {});
    responseSuccess = ProcessActionExtractor.response(request, new GraphQLResponse());
    responseError = ProcessActionExtractor.response(request, new GraphQLResponse({}, [new GraphQLError('')]));
  });

  it('should reset auth', () => {
    const state: NativeAppState = ({auth: new EntityResource()} as unknown) as NativeAppState;
    state.auth.setData({token: 'string', user: user()});
    expect(process.handleRequest(request, state, state)).toEqual({
      auth: new EntityResource(),
    });
  });

  it('should clear storage', () => {
    const generator = process.saga(request, {} as NativeAppState);
    expect(generator.next().value).toEqual(call(nativeStorage.clear));
    expect(generator.next().done).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());
});
