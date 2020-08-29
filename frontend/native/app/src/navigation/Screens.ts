import {Router} from '@byot-frontend/web-app/src/router/Router';

export const Screens = {
  Login: {
    Name: 'Login',
    Uri: Router.login.URI,
  },
  Register: {
    Name: 'Register',
    Uri: Router.register.URI,
  },
  RequestPasswordReset: {
    Name: 'RequestPasswordReset',
    Uri: Router.resetPassword.URI,
  },
  TrainingSetList: {
    Name: 'TrainingSetList',
    Uri: Router.URI,
  },
};
