import {Action} from 'typescript-fsa';
import {AsynchronousAction, AsynchronousActionResponse} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {gql} from 'apollo-boost';
import {call} from 'redux-saga/effects';
import {ProcessActionCreator} from '../../../redux-system/process/ProcessActionCreator';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {SuccessSnackbar} from '../../../../../web/common/src/types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../../../web/common/src/types/app/snackbar/ErrorSnackbar';
import {IResetPassword} from '../../../types/interfaces/IResetPassword';

export type Request = IResetPassword;
export type Response = {};

@ProcessActionCreator()
export class SubmitResetPassword implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: FrontendCommonState,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      is: {
        ...nextState.is,
        resettingPassword: true,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>): Generator<any, any, any> {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation resetPassword($input: ResetPassword!) {
          userResetPassword(input: $input) {
            id
          }
        }
      `,
      variables: {input: action.payload},
    })).data.userResetPassword;
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
        resettingPassword: false,
      },
    };
  }
}
