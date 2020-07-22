import {createEnvApolloClient} from '@byot-frontend/common/src/graphql/client/EnvApolloClient';
import {frontendCommonWebStorage} from '../dom/FrontendCommonWebStorage';

export const apolloClient = createEnvApolloClient(() => frontendCommonWebStorage.getItem('auth')?.token);
