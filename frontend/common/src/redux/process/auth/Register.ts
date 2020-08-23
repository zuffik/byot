import {Action} from 'typescript-fsa';
import {AsynchronousAction} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';
import {IUserRegister} from '../../../types/interfaces/IUserRegister';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {IAuth} from '../../../types/interfaces/IAuth';

export type Request = IUserRegister;
export type Response = IAuth;

// todo transform to override
export abstract class Register implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Generator<any, any, any> {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation register($userRegister: UserRegister!) {
          userRegister(user: $userRegister) {
            ...fullAuthFragment
          }
        }
        ${fullAuthFragment()}
      `,
      variables: {userRegister: action.payload},
    })).data.userRegister;
  }
}
