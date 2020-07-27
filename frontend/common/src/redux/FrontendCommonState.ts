import {Auth} from '../shared/graphql/ts/types';
import {Resource} from '../redux-system/data-structures/resources/Resource';
import {EntityResource} from '../redux-system/data-structures/resources/EntityResource';
import {SnackbarContent} from '../types/app/snackbar/SnackbarContent';

export class FrontendCommonState {
  auth: Resource<Auth> = new EntityResource();
  snackbar?: SnackbarContent;
  is = {
    requestingPasswordReset: false,
    resettingPassword: false,
  };
}
