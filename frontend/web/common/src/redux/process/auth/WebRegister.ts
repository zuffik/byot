import {Action} from 'typescript-fsa';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {WebState} from '../../WebState';
import {
  Register,
  Request as RegisterRequest,
  Response as RegisterResponse,
} from '@byot-frontend/common/src/redux/process/auth/Register';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {Auth} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';

export type Request = RegisterRequest;
export type Response = RegisterResponse;

@ProcessActionCreator()
export class WebRegister extends Register {
  *saga(action: Action<Request>, state: Readonly<WebState>) {
    const result: GraphQLResponse<Auth> = yield super.saga(action, state);
    if (result.success) {
      frontendCommonWebStorage.setItem('auth', result.data!);
    }
    return result;
  }
}
