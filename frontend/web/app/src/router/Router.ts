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
    detail = new (class {
      params = new (class {
        trainingId?: string;
      })();
      URI = ({trainingId = ':trainingId'}: typeof Router.training.detail.params = {}) =>
        `${Router.training.URI()}/${trainingId}`;
    })();
    edit = new (class {
      params = new (class {
        trainingId?: string;
      })();
      URI = ({trainingId = ':trainingId'}: typeof Router.training.edit.params = {}) =>
        `${Router.training.URI()}/${trainingId}/edit`;
    })();
  })();
  trainingSet = new (class {
    URI = () => `${Router.training.URI()}/set`;
    create = new (class {
      URI = () => `${Router.trainingSet.URI()}/create`;
    })();
    detail = new (class {
      params = new (class {
        trainingSetId?: string;
      })();
      URI = ({trainingSetId = ':trainingSetId'}: typeof Router.trainingSet.detail.params = {}) =>
        `${Router.trainingSet.URI()}/${trainingSetId}`;
    })();
    edit = new (class {
      params = new (class {
        trainingSetId?: string;
      })();
      URI = ({trainingSetId = ':trainingSetId'}: typeof Router.trainingSet.edit.params = {}) =>
        `${Router.trainingSet.URI()}/${trainingSetId}/edit`;
    })();
    training = new (class {
      params = new (class {
        trainingSetId?: string;
      })();
      URI = ({trainingSetId = ':trainingSetId'}: typeof Router.trainingSet.training.params = {}) =>
        `${Router.trainingSet.URI()}/${trainingSetId}`;
      create = new (class {
        URI = ({trainingSetId = ':trainingSetId'}: typeof Router.trainingSet.training.params = {}) =>
          `${Router.trainingSet.training.URI({trainingSetId})}/create-training`;
      })();
    })();
  })();
})();
