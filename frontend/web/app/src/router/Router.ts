/* eslint-disable */
export const Router = new (class {
  URI = () => '/';
  login = new (class {
    URI = () => `${Router.URI()}login`;
  })();
  logout = new (class {
    URI = () => `${Router.URI()}logout`;
  })();
  register = new (class {
    URI = () => `${Router.URI()}sign-up`;
  })();
  user = new (class {
    URI = () => `${Router.URI()}profile`;
  })();
  resetPassword = new (class {
    URI = () => `${Router.URI()}reset-password`;
    confirmPasswords = new (class {
      params = new (class {
        token?: string;
      })();
      URI = ({token = ':token'}: typeof Router.resetPassword.confirmPasswords.params = {}) =>
        `${Router.resetPassword.URI()}/${token}`;
    })();
  })();
  training = new (class {
    URI = () => `${Router.URI()}training`;
    create = new (class {
      URI = () => `${Router.training.trainingSet.URI()}/create`;
    })();
    list = new (class {
      URI = () => `${Router.training.URI()}/list`;
    })();
    detail = new (class {
      params = new (class {
        trainingId?: string;
      })();
      URI = ({trainingId = ':trainingId'}: typeof Router.training.detail.params = {}) =>
        `${Router.training.URI()}/${trainingId}`;
    })();
    trainingSet = new (class {
      URI = () => `${Router.training.URI()}/set`;
      create = new (class {
        URI = () => `${Router.training.trainingSet.URI()}/create`;
      })();
      list = new (class {
        URI = () => `${Router.training.trainingSet.URI()}/list`;
      })();
      detail = new (class {
        params = new (class {
          trainingSetId?: string;
        })();
        URI = ({trainingSetId = ':trainingSetId'}: typeof Router.training.trainingSet.detail.params = {}) =>
          `${Router.training.trainingSet.URI()}/${trainingSetId}`;
      })();
    })();
  })();
})();
