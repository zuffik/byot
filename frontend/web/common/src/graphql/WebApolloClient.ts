import {createEnvApolloClient} from '@byot-frontend/common/src/graphql/client/EnvApolloClient';
import {frontendCommonWebStorage} from '../dom/FrontendCommonWebStorage';

export const createWebApolloClient = () =>
  createEnvApolloClient(() => frontendCommonWebStorage.getItem('auth')?.token);
