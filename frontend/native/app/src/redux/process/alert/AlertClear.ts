import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {SynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {NativeAppState} from '../../NativeAppState';

export type Payload = {};

@ProcessActionCreator()
export class AlertClear implements SynchronousAction<NativeAppState, Payload> {
  handle(
    action: Action<Payload>,
    nextState: Readonly<NativeAppState>,
    prevState: NativeAppState
  ): NativeAppState {
    return {...nextState, alert: undefined};
  }
}
