import { createTheme } from '@byot-frontend/web-common/src/CreateTheme';
import { storeFactory } from '@byot-frontend/common/src/redux/store/Store';
import { LandingPageState } from './redux/LandingPageState';

export const theme = createTheme();
export const reduxStore = storeFactory(
  () => new LandingPageState(),
  'landingPage'
);
