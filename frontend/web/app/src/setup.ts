import { createTheme } from '@byot-frontend/web-common/src/CreateTheme';
import { storeFactory } from '@byot-frontend/common/src/redux/store/Store';
import { WebAppState } from './redux/WebAppState';

export const theme = createTheme();
export const reduxStore = storeFactory(() => new WebAppState(), 'webApp');
