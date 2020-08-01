import {
  AsynchronousAction,
  SynchronousAction,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {Action} from 'typescript-fsa';
import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';

export type Request = {};
export type Response = {};

@ProcessActionCreator()
export class Logout implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      auth: new EntityResource(undefined),
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    frontendCommonWebStorage.removeItem('auth');
  }
}
