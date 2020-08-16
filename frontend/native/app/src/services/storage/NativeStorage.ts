import {AsyncStorage} from './AsyncStorage';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';

export interface NativeStorage {
  auth?: IAuth;
}

export const nativeStorage = new AsyncStorage<NativeStorage>();
