import {
  TrainingSetUpdate as TrainingSetUpdateBase,
  Response,
  Request,
} from '@byot-frontend/common/src/redux/process/training-set/TrainingSetUpdate';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {Action} from 'typescript-fsa';
import {Router} from '../../../router/Router';
import {ErrorSnackbar} from '@byot-frontend/web-common/src/types/app/snackbar/ErrorSnackbar';
import {SuccessSnackbar} from '@byot-frontend/web-common/src/types/app/snackbar/SuccessSnackbar';

@ProcessActionCreator()
export class TrainingSetUpdate extends TrainingSetUpdateBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<WebAppState>,
    prevState: Readonly<WebAppState>
  ): Readonly<WebAppState> {
    const state = super.handleResponse(action, nextState, prevState);
    return {
      ...nextState,
      ...state,
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('Successfully updated training set')
        : new ErrorSnackbar('There was an error updating training set'),
      ...(action.payload.response.data && {
        redirect: Router.trainingSet.detail.URI({trainingSetId: action.payload.response.data.id}),
      }),
    };
  }
}
