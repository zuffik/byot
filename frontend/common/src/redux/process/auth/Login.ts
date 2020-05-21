import {Action} from 'typescript-fsa';
import {AsynchronousAction} from '../../../redux-system/process/ProcessActions';
import {ProcessActionCreator} from '../../../redux-system/process/ProcessActionCreator';
import {FrontendCommonState} from '../../FrontendCommonState';
import {Auth, UserLogin} from '../../../shared/graphql/ts/types';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';
import {apolloClient} from '@byot-frontend/web-common/src/graphql/WebApolloClient';

export type Request = UserLogin;
export type Response = Auth;

export abstract class Login implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Generator<any, any, any> {
    return (yield call(apolloClient.mutate, {
      mutation: gql`
        mutation login($userLogin: UserLogin!) {
          userLogin(user: $userLogin) {
            ...fullAuthFragment
          }
        }
        ${fullAuthFragment()}
      `,
      variables: {userLogin: action.payload},
    })).data.userLogin;
  }
}
