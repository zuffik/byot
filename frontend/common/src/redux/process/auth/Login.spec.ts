import {Login} from './Login';
import {apolloClient} from '../../../graphql/client/EnvApolloClient';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {UserLogin} from '../../../shared/graphql/ts/types';
import {FrontendCommonState} from '../../FrontendCommonState';
import {call} from 'redux-saga/effects';

describe('Login process', () => {
  let process: Login;

  beforeEach(() => (process = new Login()));

  it('should call mutation', () => {
    jest.spyOn(apolloClient, 'mutate').mockImplementation(jest.fn());
    const state: Readonly<FrontendCommonState> = {} as Readonly<FrontendCommonState>;
    const payload: UserLogin = {
      userNameOrEmail: 'username@email.com',
      password: 'P4$$w0RD',
    };
    const request = ProcessActionExtractor.dispatch(Login, payload);
    const iterator = process.saga(request, state);
    expect(iterator.next().value).toEqual(
      call(apolloClient.mutate, {
        mutation: expect.anything(),
        variables: payload,
      })
    );
  });
});
