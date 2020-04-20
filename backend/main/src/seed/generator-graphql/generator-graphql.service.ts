import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { chance } from '../chance';
import { DateTime, Role, User as IUser, UserRegister } from '../../graphql/ts/types';

@Injectable()
export class GeneratorGraphqlService {
  public dateTime(): DateTime {
    const date = moment(chance.integer({min: 0, max: +moment()}));
    return {
      iso: date.toISOString(),
      timestamp: +date,
      humanReadable: date.format(),
    };
  }

  public user(): IUser {
    const first = chance.first();
    const last = chance.last();
    return {
      id: chance.guid(),
      createdAt: this.dateTime(),
      updatedAt: chance.bool({likelihood: 0.2}) ? this.dateTime() : undefined,
      lastLogin: chance.bool({likelihood: 0.9}) ? this.dateTime() : undefined,
      email: chance.email(),
      firstName: first,
      fullName: last,
      lastName: `${first} ${last}`,
      role: chance.bool({likelihood: 0.1}) ? Role.ADMIN : Role.USER,
      userName: chance.twitter().substr(1),
    };
  }

  public userRegister(): UserRegister {
    const generateName = chance.bool({likelihood: 0.6});
    return {
      email: chance.email(),
      firstName: generateName ? chance.first() : undefined,
      lastName: generateName ? chance.last() : undefined,
      password: chance.guid(),
      role: chance.bool({likelihood: 0.1}) ? Role.ADMIN : Role.USER,
      userName: chance.twitter().substr(1),
    };
  }
}