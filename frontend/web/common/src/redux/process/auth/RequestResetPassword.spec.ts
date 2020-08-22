import {RequestResetPassword} from './RequestResetPassword';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {WebState} from '../../WebState';
import {SuccessSnackbar} from '../../../types/app/snackbar/SuccessSnackbar';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

describe('RequestResetPassword override', () => {
  it('should dispatch success snackbar', () => {
    const process = new RequestResetPassword();
    const request = ProcessActionExtractor.dispatch(RequestResetPassword, {email: 'email@email.sk'});
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
    const process = new RequestResetPassword();
    const request = ProcessActionExtractor.dispatch(RequestResetPassword, {email: 'email@email.sk'});
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
