import {FrontendCommonState} from '@byot-frontend/common/src/redux/FrontendCommonState';
import {Resource} from '@byot-frontend/common/src/redux-system/data-structures/resources/Resource';
import {IAuth} from '@byot-frontend/common/src/types/interfaces/IAuth';
import {EntityResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/EntityResource';
import {BindProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/BindProcessActionCreator';
import {NativeAuth} from './process/auth/NativeAuth';
import {LocalAuth} from './process/auth/LocalAuth';
import {AlertOptions} from '../types/alert/AlertOptions';
import {NavigateOptions} from '../types/nav/NavigateOptions';

export class NativeAppState extends FrontendCommonState {
  @BindProcessActionCreator(NativeAuth)
  @BindProcessActionCreator(LocalAuth)
  auth: Resource<IAuth> = new EntityResource();

  alert?: AlertOptions;
  navigation?: NavigateOptions;

  constructor() {
    super();
  }
}
