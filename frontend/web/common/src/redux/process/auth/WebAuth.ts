import {Action} from 'typescript-fsa';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {WebState} from '../../WebState';
import {
  Login,
  Request as LoginRequest,
  Response as LoginResponse,
} from '@byot-frontend/common/src/redux/process/auth/Login';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {Auth} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';
import {Effect} from 'redux-saga/effects';

export type Request = LoginRequest;
export type Response = LoginResponse;

@ProcessActionCreator()
export class WebAuth extends Login {
  *saga(action: Action<Request>, state: Readonly<WebState>): Effect | Generator<any, any, any> {
    const result: GraphQLResponse<Auth> = (yield super.saga(action, state)).data.userLogin;
    if (result.success) {
      frontendCommonWebStorage.setItem('auth', result.data!);
    }
    return result;
  }
}
