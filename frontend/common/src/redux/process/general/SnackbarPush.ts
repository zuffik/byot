import {SnackbarContent} from '../../../types/app/SnackbarContent';
import {SynchronousAction} from '../../../redux-system/process/ProcessActions';
import {FrontendCommonState} from '../../FrontendCommonState';
import {Action} from 'typescript-fsa';
import {ProcessActionCreator} from '../../../redux-system/process/ProcessActionCreator';

export type Payload = SnackbarContent;

@ProcessActionCreator()
export class SnackbarPush implements SynchronousAction<FrontendCommonState, Payload> {
  handle(
    action: Action<Payload>,
    nextState: Readonly<FrontendCommonState>,
    prevState: FrontendCommonState
  ): FrontendCommonState {
    return {
      ...nextState,
      snackbar: action.payload,
    };
  }
}
