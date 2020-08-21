import {createEnvApolloClient} from '@byot-frontend/common/src/graphql/client/EnvApolloClient';
import {RuntimeStorage} from '../services/storage/RuntimeStorage';

export const createNativeApolloClient = () => createEnvApolloClient(() => RuntimeStorage.auth?.token);
