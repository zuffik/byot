import {LocalStorage} from './LocalStorage';
import {Auth} from '@byot/common/graphql/ts/types';

export interface FrontendCommonWebStorage {
  auth: Auth;
}

export const frontendCommonWebStorage = new LocalStorage<FrontendCommonWebStorage>();
