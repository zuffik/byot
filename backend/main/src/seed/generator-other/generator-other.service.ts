import { Injectable } from '@nestjs/common';
import { JwtUserType } from '../../auth/decorators/jwt-user.decorator';
import { chance } from '../chance';
import { Role } from '../../graphql/ts/types';

@Injectable()
export class GeneratorOtherService {
  public jwtUser(): JwtUserType {
    return {
      role: chance.pickone([Role.USER, Role.ADMIN]),
      id: chance.guid(),
      email: chance.email(),
    };
  }
}
