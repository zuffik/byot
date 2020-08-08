import {
  TrainingUpdate as TrainingUpdateBase,
  Response,
  Request,
} from '@byot-frontend/common/src/redux/process/training/TrainingUpdate';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {Action} from 'typescript-fsa';
import {Router} from '../../../router/Router';

@ProcessActionCreator()
export class TrainingUpdate extends TrainingUpdateBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<WebAppState>,
    prevState: Readonly<WebAppState>
  ): Readonly<WebAppState> {
    const state = super.handleResponse(action, nextState, prevState);
    return {
      ...nextState,
      ...state,
      ...(action.payload.response.data && {
        redirect:
          action.payload.request.training.media.length > 0
            ? Router.training.detail.URI({trainingId: action.payload.response.data.id})
            : Router.URI(),
      }),
    };
  }
}
