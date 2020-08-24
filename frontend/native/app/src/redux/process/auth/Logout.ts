import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {NativeAppState} from '../../NativeAppState';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {DataResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/DataResponse';
import {call} from 'redux-saga/effects';

export type Request = {};
export type Response = {};

@ProcessActionCreator()
export class Logout implements AsynchronousAction<NativeAppState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<NativeAppState>,
    prevState: Readonly<NativeAppState>
  ): Readonly<NativeAppState> {
    return {
      ...nextState,
      auth: nextState.auth.reset(),
    };
  }

  *saga(action: Action<Request>, state: Readonly<NativeAppState>) {
    try {
      yield call(nativeStorage.clear);
    } catch (e) {
      // nothing... it's empty
    }
    return {
      success: true,
    } as DataResponse<undefined>;
  }
}
