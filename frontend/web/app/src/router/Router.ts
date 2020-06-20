export const Router = {
  URI: () => '/',
  login: {
    URI: () => `${Router.URI()}login`,
  },
  register: {
    URI: () => `${Router.URI()}sign-up`,
  },
  resetPassword: {
    URI: () => `${Router.URI()}reset-password`,
  },
};
