import {Action} from 'typescript-fsa';
import {AsynchronousAction} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {gql} from 'apollo-boost';
import {call, Effect} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {IUserLogin} from '../../../types/interfaces/IUserLogin';
import {IAuth} from '../../../types/interfaces/IAuth';

export type Request = IUserLogin;
export type Response = IAuth;

export abstract class Login implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Effect | Generator<any, any, any> {
    return (yield call(ApolloContext.apolloClient.mutate, {
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
