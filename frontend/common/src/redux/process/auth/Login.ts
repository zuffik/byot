import {Action} from 'typescript-fsa';
import {AsynchronousAction, AsynchronousActionResponse} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {Auth, UserLogin} from '../../../shared/graphql/ts/types';
import {gql} from 'apollo-boost';
import {call, Effect} from 'redux-saga/effects';
import {fullAuthFragment} from '../../../graphql/fragments/FullAuthFragment';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';
import {ApolloContext} from '../../../graphql/context/ApolloContext';

export type Request = UserLogin;
export type Response = Auth;

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

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    if (!action.payload.response.success) {
      return {
        ...nextState,
        snackbar: new ErrorSnackbar('Error while trying to login, please, check username or password'),
      };
    }
    return nextState;
  }
}
