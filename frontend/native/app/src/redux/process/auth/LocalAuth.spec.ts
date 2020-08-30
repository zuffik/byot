import {LocalAuth, Request, Response} from './LocalAuth';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {call} from 'redux-saga/effects';
import {user} from '@byot-frontend/common/test/fixtures/dto/User';

describe('LocalAuth process', () => {
  let process: LocalAuth;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new LocalAuth();
    request = ProcessActionExtractor.dispatch(LocalAuth, {});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should fetch auth from storage without fallback', () => {
    const generator = process.saga(request, {} as NativeAppState);
    expect(generator.next().value).toEqual(call(nativeStorage.getItem, 'auth', undefined));
    expect(generator.next().done).toBeTruthy();
  });

  it('should fetch auth from storage with fallback to payload', () => {
    const auth = {token: 'string', user: user()};
    request = ProcessActionExtractor.dispatch(LocalAuth, {auth});
    const generator = process.saga(request, {} as NativeAppState);
    expect(generator.next().value).toEqual(call(nativeStorage.getItem, 'auth', auth));
    expect(generator.next().done).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());
});
