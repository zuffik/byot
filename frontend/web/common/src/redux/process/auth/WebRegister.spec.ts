import {Auth} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebRegister} from './WebRegister';
import {apolloClient} from '../../../graphql/WebApolloClient';
import {WebState} from '../../WebState';
import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {User} from '@byot-frontend/common/src/types/dto/User';
import {IUserRegister} from '@byot-frontend/common/src/types/interfaces/IUserRegister';
import {GraphQLError} from 'graphql';

describe('WebRegister process', () => {
  let process: WebRegister;

  beforeEach(() => (process = new WebRegister()));

  it('should successfully register', () => {
    jest.spyOn(apolloClient, 'mutate').mockImplementation(jest.fn());
    const setItemSpy = jest.spyOn(frontendCommonWebStorage, 'setItem').mockImplementation(jest.fn());
    const state: Readonly<WebState> = {} as Readonly<WebState>;
    const payload: IUserRegister = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc-',
      userName: '',
    };
    const request = ProcessActionExtractor.dispatch(WebRegister, payload);
    const iterator = process.saga(request, state);
    const response = new GraphQLResponse<Auth>({token: 'token', user: new User()});
    expect(iterator.next().done).toBeFalsy();
    expect(iterator.next(response).done).toBeTruthy();
    expect(setItemSpy).toBeCalledWith(expect.any(String), response.data);
  });

  it('should fail registering', () => {
    jest.spyOn(apolloClient, 'mutate').mockImplementation(jest.fn());
    const setItemSpy = jest.spyOn(frontendCommonWebStorage, 'setItem').mockImplementation(jest.fn());
    const state: Readonly<WebState> = {} as Readonly<WebState>;
    const payload: IUserRegister = {
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123-Abc-',
      userName: '',
    };
    const request = ProcessActionExtractor.dispatch(WebRegister, payload);
    const iterator = process.saga(request, state);
    const response = new GraphQLResponse<Auth>(undefined, [new GraphQLError('anything')]);
    expect(iterator.next().done).toBeFalsy();
    expect(iterator.next(response).done).toBeTruthy();
    expect(setItemSpy).not.toBeCalled();
  });

  afterEach(() => jest.clearAllMocks());
});
