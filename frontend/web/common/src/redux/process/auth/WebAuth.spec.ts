import {Login} from '@byot-frontend/common/src/redux/process/auth/Login';
import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {UserLogin} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {call} from 'redux-saga/effects';
import {WebAuth} from './WebAuth';
import {apolloClient} from '../../../graphql/WebApolloClient';
import {WebState} from '../../WebState';

describe('WebAuth process', () => {
  let process: WebAuth;

  beforeEach(() => (process = new WebAuth()));

  it('should call mutation', () => {
    jest.spyOn(apolloClient, 'mutate').mockImplementation(jest.fn());
    const state: Readonly<WebState> = {} as Readonly<WebState>;
    const payload: UserLogin = {
      userNameOrEmail: 'username@email.com',
      password: 'P4$$w0RD',
    };
    const request = ProcessActionExtractor.dispatch(WebAuth, payload);
    const iterator = process.saga(request, state);
    expect(iterator.next().value).toEqual(
      call(apolloClient.mutate, {
        mutation: expect.anything(),
        variables: payload,
      })
    );
  });
});
