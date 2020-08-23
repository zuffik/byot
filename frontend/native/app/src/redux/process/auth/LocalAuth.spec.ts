import {LocalAuth, Request, Response} from './LocalAuth';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {call} from 'redux-saga/effects';

describe('LocalAuth process', () => {
  let process: LocalAuth;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new LocalAuth();
    request = ProcessActionExtractor.dispatch(LocalAuth, {});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should fetch auth from storage', () => {
    const generator = process.saga(request, {} as NativeAppState);
    expect(generator.next().value).toEqual(call(nativeStorage.getItem, 'auth'));
    expect(generator.next().done).toBeTruthy();
  });

  afterEach(() => jest.clearAllMocks());
});
