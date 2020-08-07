import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {SynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {FrontendCommonState} from '../../FrontendCommonState';
import {IMedia} from '../../../types/interfaces/IMedia';

export type Payload = {media: IMedia};

@ProcessActionCreator()
export class TrainingSetPlayingMedia implements SynchronousAction<FrontendCommonState, Payload> {
  handle(
    action: Action<Payload>,
    nextState: Readonly<FrontendCommonState>,
    prevState: FrontendCommonState
  ): FrontendCommonState {
    return {
      ...nextState,
      currentMedia: action.payload.media,
    };
  }
}
