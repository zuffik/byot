import {
  Request as RequestBase,
  RequestResetPassword as RequestResetPasswordBase,
  Response as ResponseBase,
} from '@byot-frontend/common/src/redux/process/auth/RequestResetPassword';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {NativeAppState} from '../../NativeAppState';
import {AlertOK} from '../../../types/alert/AlertOK';
import {NavigateBack} from '../../../types/nav/NavigateBack';
import {NavigateReset} from '../../../types/nav/NavigateReset';

export type Request = RequestBase;
export type Response = ResponseBase;

@ProcessActionCreatorOverride(RequestResetPasswordBase)
export class RequestResetPassword extends RequestResetPasswordBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: NativeAppState,
    prevState: Readonly<NativeAppState>
  ): Readonly<NativeAppState> {
    return {
      ...super.handleResponse(action, nextState, prevState),
      ...(action.payload.response.success && {navigation: new NavigateReset('Login')}),
      alert: new AlertOK(
        action.payload.response.success
          ? 'You have successfully requested new password'
          : 'Something went wrong'
      ),
    };
  }
}
