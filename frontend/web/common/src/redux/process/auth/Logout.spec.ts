import {frontendCommonWebStorage} from '../../../dom/FrontendCommonWebStorage';
import {Logout} from './Logout';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';

describe('Logout', () => {
  let process: Logout;
  beforeAll(() => (process = new Logout()));
  it('should remove user from state', () => {
    const state = process.handleRequest(
      ProcessActionExtractor.dispatch(Logout, {}),
      {} as FrontendCommonState,
      {} as FrontendCommonState
    );
    expect(state.auth).toEqual(expect.any(EntityResource));
    expect(state.auth.data).toBeUndefined();
  });
  it('should clear storage', () => {
    const spy = jest.spyOn(frontendCommonWebStorage, 'removeItem').mockImplementation(jest.fn());
    const generator = process.saga(ProcessActionExtractor.dispatch(Logout, {}), {} as FrontendCommonState);
    generator.next();
    expect(spy).toBeCalledWith('auth');
  });
});
