import {Action} from 'typescript-fsa';
import {AsynchronousAction, AsynchronousActionResponse} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {ProcessActionCreator} from '../../../redux-system/process/ProcessActionCreator';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {SuccessSnackbar} from '../../../../../web/common/src/types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../../../web/common/src/types/app/snackbar/ErrorSnackbar';

export type Request = {email: string};
export type Response = {};

@ProcessActionCreator()
export class RequestResetPassword implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: FrontendCommonState,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      is: {
        ...nextState.is,
        requestingPasswordReset: true,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Generator<any, any, any> {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation requestReset($email: String!) {
          userRequestPasswordReset(email: $email)
        }
      `,
      variables: {email: action.payload.email},
    })).data.userRequestPasswordReset;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: FrontendCommonState,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      is: {
        ...nextState.is,
        requestingPasswordReset: false,
      },
    };
  }
}
