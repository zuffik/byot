import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {TrainingSetBaseFetch} from '@byot-frontend/common/src/redux/process/training-set/TrainingSetBaseFetch';
import {WebAppState} from '../../WebAppState';
import {Router} from '../../../router/Router';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';

export type Request = {id: string};
export type Response = {};

@ProcessActionCreatorOverride(TrainingSetBaseFetch)
export class TrainingSetFetch extends TrainingSetBaseFetch {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<WebAppState>,
    prevState: Readonly<WebAppState>
  ): Readonly<WebAppState> {
    return {
      ...nextState,
      redirect: action.payload.response.success ? undefined : Router.URI(),
    };
  }
}
