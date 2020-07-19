import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {Action} from 'typescript-fsa';

export type Request = {};
export type Response = {};

@ProcessActionCreator()
export class FetchTrainingSets implements AsynchronousAction<WebAppState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<WebAppState>) {}
}
