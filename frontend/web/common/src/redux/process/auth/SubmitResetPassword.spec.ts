import {SubmitResetPassword} from './SubmitResetPassword';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebState} from '../../WebState';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

describe('SubmitResetPassword override', () => {
  it('should dispatch success snackbar', () => {
    const process = new SubmitResetPassword();
    const request = ProcessActionExtractor.dispatch(SubmitResetPassword, {
      newPassword: 'new',
      passwordRepeat: 'new',
      token: 'token',
    });
    expect(
      process.handleResponse(
        ProcessActionExtractor.response(request, {success: true}),
        {} as WebState,
        {} as WebState
      )
    ).toEqual(
      expect.objectContaining({
        snackbar: expect.any(SuccessSnackbar),
      })
    );
  });
  it('should dispatch error snackbar', () => {
    const process = new SubmitResetPassword();
    const request = ProcessActionExtractor.dispatch(SubmitResetPassword, {
      newPassword: 'new',
      passwordRepeat: 'new',
      token: 'token',
    });
    expect(
      process.handleResponse(
        ProcessActionExtractor.response(request, {success: false}),
        {} as WebState,
        {} as WebState
      )
    ).toEqual(
      expect.objectContaining({
        snackbar: expect.any(ErrorSnackbar),
      })
    );
  });
});
