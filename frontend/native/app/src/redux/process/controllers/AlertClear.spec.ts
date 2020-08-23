import {AlertClear} from './AlertClear';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {NativeAppState} from '../../NativeAppState';

describe('AlertClear process', () => {
  it('should clear alert', () => {
    const process = new AlertClear();
    expect(
      process.handle(
        ProcessActionExtractor.dispatch(AlertClear, {}),
        {} as NativeAppState,
        {} as NativeAppState
      )
    ).toEqual({
      alert: undefined,
    });
  });
});
