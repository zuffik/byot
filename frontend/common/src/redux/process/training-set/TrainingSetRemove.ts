import {
  AsynchronousAction,
  AsynchronousActionResponse,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {FrontendCommonState} from '../../FrontendCommonState';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {gql} from 'apollo-boost';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

export type Request = {id: string};
export type Response = {};

export abstract class TrainingSetRemove
  implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      is: {
        ...nextState.is,
        processingTrainingSet: true,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation removeTrainingSet($id: ID!) {
          removeTrainingSet(id: $id) {
            id
          }
        }
      `,
      variables: {id: action.payload.id},
    })).data.removeTrainingSet;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully removed training set')
        : new ErrorSnackbar('There was an error creating training set'),
      is: {
        ...nextState.is,
        processingTrainingSet: false,
      },
    };
  }
}
