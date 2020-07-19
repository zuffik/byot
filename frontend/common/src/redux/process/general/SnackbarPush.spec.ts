import {SnackbarPush} from './SnackbarPush';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {FrontendCommonState} from '../../FrontendCommonState';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';

describe('SnackbarPush', () => {
  it('should set content', () => {
    const process = new SnackbarPush();
    const result = process.handle(
      ProcessActionExtractor.dispatch(SnackbarPush, new ErrorSnackbar('Error')),
      {} as FrontendCommonState,
      {} as FrontendCommonState
    );
    expect(result).toEqual(
      expect.objectContaining({
        snackbar: expect.any(ErrorSnackbar),
      })
    );
  });
});
