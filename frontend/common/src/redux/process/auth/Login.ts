import {Action} from 'typescript-fsa';
import {AsynchronousAction} from '../../../redux-system/process/ProcessActions';
import {ProcessActionCreator} from '../../../redux-system/process/ProcessActionCreator';
import {FrontendCommonState} from '../../FrontendCommonState';
import {Auth, UserLogin} from '../../../shared/graphql/ts/types';
import {apolloClient} from '../../../graphql/client/EnvApolloClient';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';

export type Request = UserLogin;
export type Response = Auth;

@ProcessActionCreator()
export class Login implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return yield call(apolloClient.mutate, {
      mutation: gql`
        mutation login($userLogin: UserLogin) {
          userLogin(user: $userLogin) {
            ...fullAuthFragment
          }
        }
        ${fullAuthFragment()}
      `,
      variables: action.payload,
    });
  }
}
