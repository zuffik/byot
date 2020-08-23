import {RuntimeStorage} from '../services/storage/RuntimeStorage';
import {createProcessEnvApolloClient} from '@byot-frontend/common/src/graphql/client/ProcessEnvApolloClient';

export const createNativeApolloClient = () => createProcessEnvApolloClient(() => RuntimeStorage.auth?.token);
