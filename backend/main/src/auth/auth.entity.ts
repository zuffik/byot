import {Auth as IAuth} from '../graphql/ts/types';
import { User } from '../user/user.entity';

export class Auth implements IAuth {
  token: string;
  user: User;
}
