import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { chance } from '../seed/chance';
import { Role } from '../graphql/ts/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MigrationsService implements OnModuleInit {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(ConfigService) private readonly cfgService: ConfigService,
  ) {
  }

  async onModuleInit() {
    let superAdmin = await this.userService.findByUsernameOrEmail(this.cfgService.get<string>('app.superAdmin.userName'));
    if (!superAdmin) {
      superAdmin = await this.userService.findByUsernameOrEmail(this.cfgService.get<string>('app.superAdmin.email'));
      if (!superAdmin) {
        await this.userRepository.create({
          firstName: 'Super',
          lastName: 'Admin',
          role: Role.ADMIN,
          email: this.cfgService.get<string>('app.superAdmin.email'),
          userName: this.cfgService.get<string>('app.superAdmin.userName'),
          password: bcrypt.hashSync(this.cfgService.get<string>('app.superAdmin.password'), 10),
        });
      }
    }

    const demoUserPrefix = 'demo-';
    const demoUserPass = 'D3m0P4$$';
    const demoUserCount = 10;

    const demoUser = await this.userService.findByUsernameOrEmail(demoUserPrefix + '0');
    if (!demoUser) {
      await Promise.all(_.times(demoUserCount, i => this.userService.create({
        firstName: chance.first(),
        lastName: chance.last(),
        userName: demoUserPrefix + i,
        email: demoUserPrefix + i + '@example.com',
        password: bcrypt.hashSync(demoUserPass, 10),
      })));
    }
  }
}
