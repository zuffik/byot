import {SnackbarPush} from './SnackbarPush';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {ErrorSnackbar} from '../../../types/app/ErrorSnackbar';
import {FrontendCommonState} from '../../FrontendCommonState';

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
