import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {SynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {IMedia} from '../../../types/interfaces/IMedia';
import {ITraining} from '../../../types/interfaces/ITraining';
import * as _ from 'lodash';
import {FrontendCommonState} from '../../FrontendCommonState';

export type Payload = {
  training: ITraining;
};

@ProcessActionCreator()
export class TrainingPlayNext implements SynchronousAction<FrontendCommonState, Payload> {
  handle(
    action: Action<Payload>,
    nextState: Readonly<FrontendCommonState>,
    prevState: FrontendCommonState
  ): FrontendCommonState {
    const index = _.findIndex(
      action.payload.training.media.entries,
      m => m.id === nextState.currentMedia!.id
    );
    if (index === action.payload.training.media.entries.length - 1) {
      // do nothing bc the media is the last one in the list
      return nextState;
    }
    return {
      ...nextState,
      currentMedia: action.payload.training.media.entries[index + 1],
      autoplay: true,
    };
  }
}
