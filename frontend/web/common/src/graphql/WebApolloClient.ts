import {createProcessEnvApolloClient} from '@byot-frontend/common/src/graphql/client/ProcessEnvApolloClient';
import {frontendCommonWebStorage} from '../dom/FrontendCommonWebStorage';

export const createWebApolloClient = () =>
  createProcessEnvApolloClient(() => frontendCommonWebStorage.getItem('auth')?.token);
