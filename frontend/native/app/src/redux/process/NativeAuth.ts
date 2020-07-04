import {Login} from '@byot-frontend/common/src/redux/process/auth/Login';
import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';

@ProcessActionCreator()
export class NativeAuth extends Login {}
