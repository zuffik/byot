import {Resource} from '../redux-system/data-structures/resources/Resource';
import {EntityResource} from '../redux-system/data-structures/resources/EntityResource';
import {SnackbarContent} from '../types/app/snackbar/SnackbarContent';
import {IAuth} from '../types/interfaces/IAuth';

export class FrontendCommonState {
  auth: Resource<IAuth> = new EntityResource();
  snackbar?: SnackbarContent;
  is = {
    requestingPasswordReset: false,
    resettingPassword: false,

    savingTrainingSet: false,
  };
}
