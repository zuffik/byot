import {Auth, UserLogin} from '@byot/common/graphql/ts/types';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebAuth} from './WebAuth';
import {WebState} from '../../WebState';
import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {User} from '@byot-frontend/common/src/types/dto/User';
import {GraphQLError} from 'graphql';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';

describe('WebAuth process', () => {
  let process: WebAuth;

  beforeEach(() => (process = new WebAuth()));

  it('should successfully login', () => {
    const setItemSpy = jest.spyOn(frontendCommonWebStorage, 'setItem').mockImplementation(jest.fn());
    const state: Readonly<WebState> = {} as Readonly<WebState>;
    const payload: UserLogin = {
      userNameOrEmail: 'username@email.com',
      password: 'P4$$w0RD',
    };
    const request = ProcessActionExtractor.dispatch(WebAuth, payload);
    const iterator = process.saga(request, state) as Generator<any, any, any>;
    const response = new GraphQLResponse<Auth>({token: 'token', user: new User()});
    expect(iterator.next().done).toBeFalsy();
    expect(iterator.next(response).done).toBeTruthy();
    expect(setItemSpy).toBeCalledWith(expect.any(String), response.data);
  });

  it('should fail login', () => {
    jest.spyOn(ApolloContext.apolloClient, 'mutate').mockImplementation(jest.fn());
    const setItemSpy = jest.spyOn(frontendCommonWebStorage, 'setItem').mockImplementation(jest.fn());
    const state: Readonly<WebState> = {} as Readonly<WebState>;
    const payload: UserLogin = {
      userNameOrEmail: 'username@email.com',
      password: 'P4$$w0RD',
    };
    const request = ProcessActionExtractor.dispatch(WebAuth, payload);
    const iterator = process.saga(request, state) as Generator<any, any, any>;
    const response = new GraphQLResponse<Auth>(undefined, [new GraphQLError('anything')]);
    expect(iterator.next().done).toBeFalsy();
    expect(iterator.next(response).done).toBeTruthy();
    expect(setItemSpy).not.toBeCalled();
  });

  afterEach(() => jest.clearAllMocks());
});
