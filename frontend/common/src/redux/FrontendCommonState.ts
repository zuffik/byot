import {Auth} from '../shared/graphql/ts/types';
import {BindProcessActionCreator} from '../redux-system/process/BindProcessActionCreator';
import {Login} from './process/auth/Login';
import {Resource} from '../redux-system/data-structures/resources/Resource';
import {EntityResource} from '../redux-system/data-structures/resources/EntityResource';

export class FrontendCommonState {
  auth: Resource<Auth> = new EntityResource();
}
