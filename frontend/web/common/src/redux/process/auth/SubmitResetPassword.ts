import {
  SubmitResetPassword as SubmitResetPasswordBase,
  Request,
  Response,
} from '@byot-frontend/common/src/redux/process/auth/SubmitResetPassword';
import {ProcessActionCreatorOverride} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreatorOverride';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {WebState} from '../../WebState';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

@ProcessActionCreatorOverride(SubmitResetPasswordBase)
export class SubmitResetPassword extends SubmitResetPasswordBase {
  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: WebState,
    prevState: Readonly<WebState>
  ): Readonly<WebState> {
    return {
      ...super.handleResponse(action, nextState, prevState),
      snackbar: action.payload.response.success
        ? new SuccessSnackbar('You have successfully reset your password')
        : new ErrorSnackbar('Something went wrong'),
    };
  }
}
