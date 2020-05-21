import {LocalStorage} from './LocalStorage';
import {Auth} from '@byot-frontend/common/src/shared/graphql/ts/types';

export interface FrontendCommonWebStorage {
  auth: Auth;
}

export const frontendCommonWebStorage = new LocalStorage<FrontendCommonWebStorage>();
