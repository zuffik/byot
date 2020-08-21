import {SynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {SnackbarContent} from '../../../types/app/snackbar/SnackbarContent';
import {WebState} from '../../WebState';

export type Payload = SnackbarContent;

@ProcessActionCreator()
export class SnackbarPush implements SynchronousAction<WebState, Payload> {
  handle(action: Action<Payload>, nextState: Readonly<WebState>, prevState: WebState): WebState {
    return {
      ...nextState,
      snackbar: action.payload,
    };
  }
}
