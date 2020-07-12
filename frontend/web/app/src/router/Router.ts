export const Router = {
  URI: () => '/',
  login: {
    URI: () => `${Router.URI()}login`,
  },
  logout: {
    URI: () => `${Router.URI()}logout`,
  },
  register: {
    URI: () => `${Router.URI()}sign-up`,
  },
  resetPassword: {
    URI: () => `${Router.URI()}reset-password`,
  },
  training: {
    URI: () => `${Router.URI()}training`,
    list: {
      URI: () => `${Router.training.URI()}/list`,
    },
    detail: {
      params: class {
        static trainingId: string;
      },
      URI: ({trainingId = ':trainingId'}: typeof Router.training.detail.params) =>
        `${Router.training.URI()}/${trainingId}`,
    },
    trainingSet: {
      URI: () => `${Router.training.URI()}/set`,
      list: {
        URI: () => `${Router.training.trainingSet.URI()}/list`,
      },
      detail: {
        params: class {
          static trainingSetId: string;
        },
        URI: ({trainingSetId = ':trainingSetId'}: typeof Router.training.trainingSet.detail.params) =>
          `${Router.training.trainingSet.URI()}/${trainingSetId}`,
      },
    },
  },
};
