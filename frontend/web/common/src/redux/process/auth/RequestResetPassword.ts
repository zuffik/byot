import {
  RequestResetPassword as RequestResetPasswordBase,
  Request,
  Response,
} from '@byot-frontend/common/src/redux/process/auth/RequestResetPassword';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {WebState} from '../../WebState';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

@ProcessActionCreatorOverride(RequestResetPasswordBase)
export class RequestResetPassword extends RequestResetPasswordBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: WebState,
    prevState: Readonly<WebState>
  ): Readonly<WebState> {
    return {
      ...super.handleResponse(action, nextState, prevState),
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('You have successfully requested new password')
        : new ErrorSnackbar('Something went wrong'),
    };
  }
}
