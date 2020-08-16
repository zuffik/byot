import {Login, Request} from '@byot-frontend/common/src/redux/process/auth/Login';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {Action} from 'typescript-fsa';
import {call} from 'redux-saga/effects';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {NativeAppState} from '../../NativeAppState';

@ProcessActionCreator()
export class NativeAuth extends Login {
  *saga(action: Action<Request>, state: Readonly<NativeAppState>) {
    const result: GraphQLResponse<IAuth> = yield super.saga(action, state);
    if (result.success) {
      yield call(nativeStorage.setItem, 'auth', result.data);
    }
    return result;
  }
}
