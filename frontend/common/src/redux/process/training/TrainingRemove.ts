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

export type Request = {id: string};
export type Response = Partial<ITraining>;

export abstract class TrainingRemove implements AsynchronousAction<FrontendCommonState, Request, Response> {
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
        mutation removeTraining($id: ID!) {
          removeTrainingFromTrainingSet(id: $id) {
            id
            trainingSet {
              id
            }
          }
        }
      `,
      variables: {id: action.payload.id},
    })).data.removeTrainingFromTrainingSet;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully removed training')
        : new ErrorSnackbar('There was an error removing training'),
      is: {
        ...nextState.is,
        processingTrainingSet: false,
      },
    };
  }
}
