export const Router = {
  URI: () => '/',
  login: {
    URI: () => `${Router.URI()}login`,
  },
  register: {
    URI: () => `${Router.URI()}register`,
  },
  resetPassword: {
    URI: () => `${Router.URI()}reset-password`,
  },
};
