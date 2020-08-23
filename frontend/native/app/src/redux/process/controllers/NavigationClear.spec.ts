import {NavigationClear} from './NavigationClear';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {NativeAppState} from '../../NativeAppState';

describe('NavigationClear process', () => {
  it('should clear navigation', () => {
    const process = new NavigationClear();
    expect(
      process.handle(
        ProcessActionExtractor.dispatch(NavigationClear, {}),
        {} as NativeAppState,
        {} as NativeAppState
      )
    ).toEqual({
      navigation: undefined,
    });
  });
});
