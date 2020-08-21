import {SnackbarPush} from './SnackbarPush';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {ErrorSnackbar} from '../../../types/app/snackbar/ErrorSnackbar';
import {WebState} from '../../WebState';

describe('SnackbarPush', () => {
  it('should set content', () => {
    const process = new SnackbarPush();
    const result = process.handle(
      ProcessActionExtractor.dispatch(SnackbarPush, new ErrorSnackbar('Error')),
      {} as WebState,
      {} as WebState
    );
    expect(result).toEqual(
      expect.objectContaining({
        snackbar: expect.any(ErrorSnackbar),
      })
    );
  });
});
