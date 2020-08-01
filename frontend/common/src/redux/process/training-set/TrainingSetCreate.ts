import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
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

export type Request = ITrainingSetInput;
export type Response = ITrainingSet;

export abstract class TrainingSetCreate
  implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.mutate, {
      mutation: gql`
        mutation createTraininSet($trainingSet: TrainingSetInput!) {
          createTrainingSet(trainingSet: $trainingSet) {
            id
          }
        }
      `,
      variables: {trainingSet: action.payload},
    })).data.createTrainingSet;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully created training set')
        : new ErrorSnackbar('There was an error creating training set'),
    };
  }
}
