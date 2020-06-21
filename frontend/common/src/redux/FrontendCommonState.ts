import {Auth} from '../shared/graphql/ts/types';
import {BindProcessActionCreator} from '../redux-system/process/BindProcessActionCreator';
import {Login} from './process/auth/Login';
import {Resource} from '../redux-system/data-structures/resources/Resource';
import {EntityResource} from '../redux-system/data-structures/resources/EntityResource';
import {SnackbarContent} from '../types/app/SnackbarContent';

export class FrontendCommonState {
  auth: Resource<Auth> = new EntityResource();
  snackbar?: SnackbarContent;
}
