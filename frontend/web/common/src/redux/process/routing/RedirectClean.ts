import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {SynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {WebState} from '../../WebState';

export type Payload = {};

@ProcessActionCreator()
export class RedirectClean implements SynchronousAction<WebState, Payload> {
  handle(action: Action<Payload>, nextState: Readonly<WebState>, prevState: WebState): WebState {
    return {
      ...nextState,
      redirect: undefined,
    };
  }
}
