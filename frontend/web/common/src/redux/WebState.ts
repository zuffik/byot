import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {Resource} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {Auth} from '@byot/common/graphql/ts/types';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';
import {BindProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/BindProcessActionCreator';
import {WebAuth} from './process/auth/WebAuth';
import {frontendCommonWebStorage} from '../dom/FrontendCommonWebStorage';
import {WebRegister} from './process/auth/WebRegister';
import {SnackbarContent} from '@byot-frontend/common/src/types/app/snackbar/SnackbarContent';

export class WebState extends FrontendCommonState {
  @BindProcessActionCreator(WebAuth)
  @BindProcessActionCreator(WebRegister)
  auth: Resource<Auth> = new EntityResource<Auth>();

  redirect?: string;
  snackbar?: SnackbarContent;

  constructor() {
    super();
    this.auth.setData(frontendCommonWebStorage.getItem('auth'));
  }
}
