import {
  Register,
  Request as RequestBase,
  Response as ResponseBase,
} from '@byot-frontend/common/src/redux/process/auth/Register';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {NativeAppState} from '../../NativeAppState';
import {Action} from 'typescript-fsa';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {RuntimeStorage} from '../../../services/storage/RuntimeStorage';
import {call} from 'redux-saga/effects';
import {nativeStorage} from '../../../services/storage/NativeStorage';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {AlertOK} from '../../../types/alert/AlertOK';
import {NavigateNoParams} from '../../../types/nav/NavigateNoParams';

export type Request = RequestBase;
export type Response = ResponseBase;

@ProcessActionCreator()
export class NativeRegister extends Register {
  *saga(action: Action<Request>, state: Readonly<NativeAppState>): Generator<any, any, any> {
    const result: GraphQLResponse<IAuth> = yield super.saga(action, state);
    if (result.success) {
      RuntimeStorage.auth = result.data;
      yield call(nativeStorage.setItem, 'auth', result.data);
    }
    return result;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<NativeAppState>,
    prevState: Readonly<NativeAppState>
  ): Readonly<NativeAppState> {
    return {
      ...nextState,
      ...(action.payload.response.success
        ? {navigation: new NavigateNoParams('HomePage')}
        : {alert: new AlertOK('Something went wrong')}),
    };
  }
}
