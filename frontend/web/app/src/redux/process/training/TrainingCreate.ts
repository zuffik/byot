import {
  Request,
  Response,
  TrainingCreate as TrainingCreateBase,
} from '@byot-frontend/common/src/redux/process/training/TrainingCreate';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {Action} from 'typescript-fsa';
import {Router} from '../../../router/Router';
import {ErrorSnackbar} from '@byot-frontend/web-common/src/types/app/snackbar/ErrorSnackbar';
import {SuccessSnackbar} from '@byot-frontend/web-common/src/types/app/snackbar/SuccessSnackbar';

@ProcessActionCreator()
export class TrainingCreate extends TrainingCreateBase {
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
        ? new SuccessSnackbar('Successfully created training')
        : new ErrorSnackbar('There was an error creating training'),
      ...(action.payload.response.data && {
        redirect: Router.training.detail.URI({trainingId: action.payload.response.data.id}),
      }),
    };
  }
}
