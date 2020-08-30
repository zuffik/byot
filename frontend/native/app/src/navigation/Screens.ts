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
  PasswordReset: {
    Name: 'PasswordReset',
    Uri: Router.resetPassword.confirmPasswords.URI,
    Params: Router.resetPassword.confirmPasswords.params,
  },
  TrainingSetList: {
    Name: 'TrainingSetList',
    Uri: Router.URI,
  },
};
