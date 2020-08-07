import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {
  TrainingBaseFetch,
  Request as BaseRequest,
  Response as BaseResponse,
} from '@byot-frontend/common/src/redux/process/training/TrainingBaseFetch';
import {WebAppState} from '../../WebAppState';
import {Router} from '../../../router/Router';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';

export type Request = BaseRequest;
export type Response = BaseResponse;

@ProcessActionCreatorOverride(TrainingBaseFetch)
export class TrainingFetch extends TrainingBaseFetch {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<WebAppState>,
    prevState: Readonly<WebAppState>
  ): Readonly<WebAppState> {
    return {
      ...nextState,
      ...super.handleResponse(action, nextState, prevState),
      redirect: action.payload.response.success ? undefined : Router.URI(),
    };
  }
}
