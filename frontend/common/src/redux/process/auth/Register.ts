import {Action} from 'typescript-fsa';
import {AsynchronousAction} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {Auth} from '../../../shared/graphql/ts/types';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';
import {apolloClient} from '@byot-frontend/web-common/src/graphql/WebApolloClient';
import {IUserRegister} from '../../../types/interfaces/IUserRegister';

export type Request = IUserRegister;
export type Response = Auth;

export abstract class Register implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Generator<any, any, any> {
    return (yield call(apolloClient.mutate, {
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
