import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {Resource} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {Auth} from '@byot-frontend/common/src/shared/graphql/ts/types';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';
import {BindProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/BindProcessActionCreator';
import {WebAuth} from './process/auth/WebAuth';
import {frontendCommonWebStorage} from '../dom/FrontendCommonWebStorage';

export class WebState extends FrontendCommonState {
  @BindProcessActionCreator(WebAuth)
  auth: Resource<Auth> = new EntityResource<Auth>();

  constructor() {
    super();
    this.auth.data = frontendCommonWebStorage.getItem('auth');
  }
}
