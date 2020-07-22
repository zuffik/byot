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
  resetPassword = new (class {
    URI = () => `${Router.URI()}reset-password`;
  })();
  training = new (class {
    URI = () => `${Router.URI()}training`;
    list = new (class {
      URI = () => `${Router.training.URI()}/list`;
    })();
    detail = new (class {
      params = new (class {
        trainingId?: string;
      })();
      URI = ({trainingId = ':trainingId'}: typeof Router.training.detail.params) =>
        `${Router.training.URI()}/${trainingId}`;
    })();
    trainingSet = new (class {
      URI = () => `${Router.training.URI()}/set`;
      list = new (class {
        URI = () => `${Router.training.trainingSet.URI()}/list`;
      })();
      detail = new (class {
        params = new (class {
          trainingSetId?: string;
        })();
        URI = ({trainingSetId = ':trainingSetId'}: typeof Router.training.trainingSet.detail.params) =>
          `${Router.training.trainingSet.URI()}/${trainingSetId}`;
      })();
    })();
  })();
})();
