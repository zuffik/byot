import {
  SubmitResetPassword as SubmitResetPasswordBase,
  Request as RequestBase,
  Response as ResponseBase,
} from '@byot-frontend/common/src/redux/process/auth/SubmitResetPassword';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {NativeAppState} from '../../NativeAppState';
import {AlertOK} from '../../../types/alert/AlertOK';
import {NavigateReset} from '../../../types/nav/NavigateReset';

export type Request = RequestBase;
export type Response = ResponseBase;

@ProcessActionCreatorOverride(SubmitResetPasswordBase)
export class SubmitResetPassword extends SubmitResetPasswordBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: NativeAppState,
    prevState: Readonly<NativeAppState>
  ): Readonly<NativeAppState> {
    return {
      ...super.handleResponse(action, nextState, prevState),
      ...(action.payload.response.success
        ? {
            alert: new AlertOK('Success', 'Password successfully changed. Now you can login.'),
            navigation: new NavigateReset('Login'),
          }
        : {alert: new AlertOK('Something went wrong')}),
    };
  }
}
