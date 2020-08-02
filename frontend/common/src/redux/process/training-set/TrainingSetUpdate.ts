import {
  AsynchronousAction,
  AsynchronousActionResponse,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {FrontendCommonState} from '../../FrontendCommonState';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {gql} from 'apollo-boost';
import {ITrainingSetInput} from '../../../types/interfaces/ITrainingSetInput';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';
import {ITrainingSet} from '../../../types/interfaces/ITrainingSet';

export type Request = {
  trainingSet: ITrainingSetInput;
  id: string;
};
export type Response = ITrainingSet;

export abstract class TrainingSetUpdate
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
        savingTrainingSet: true,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation updateTrainingSet($trainingSet: TrainingSetInput!, $id: ID!) {
          updateTrainingSet(trainingSet: $trainingSet, id: $id) {
            id
          }
        }
      `,
      variables: {trainingSet: action.payload.trainingSet, id: action.payload.id},
    })).data.updateTrainingSet;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully updated training set')
        : new ErrorSnackbar('There was an error updating training set'),
      is: {
        ...nextState.is,
        savingTrainingSet: false,
      },
    };
  }
}
