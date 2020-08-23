import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {NativeAppState} from '../../NativeAppState';
import {Action} from 'typescript-fsa';
import {call} from 'redux-saga/effects';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {DataResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/DataResponse';
import {RuntimeStorage} from '../../../services/storage/RuntimeStorage';

export type Request = {};
export type Response = {};

@ProcessActionCreator()
export class LocalAuth implements AsynchronousAction<NativeAppState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<NativeAppState>) {
    const auth: IAuth | undefined = yield call(nativeStorage.getItem, 'auth');
    RuntimeStorage.auth = auth;
    return {
      data: auth,
      success: true,
    } as DataResponse<IAuth | undefined>;
  }
}
