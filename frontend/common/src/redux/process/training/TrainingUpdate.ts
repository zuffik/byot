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
import {ITraining} from '../../../types/interfaces/ITraining';
import {ITrainingDraftInput} from '../../../types/interfaces/ITrainingDraftInput';

export type Request = {
  training: ITrainingDraftInput;
  id: string;
};
export type Response = ITraining;

export abstract class TrainingUpdate implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      is: {
        ...nextState.is,
        processingTraining: true,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation updateTraining($training: TrainingDraftInput!, $id: ID!) {
          updateTraining(training: $training, id: $id) {
            id
          }
        }
      `,
      variables: {training: action.payload.training, id: action.payload.id},
    })).data.updateTraining;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully updated training')
        : new ErrorSnackbar('There was an error updating training'),
      is: {
        ...nextState.is,
        processingTraining: false,
      },
    };
  }
}
