import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRegister, UserUpdateInput } from '../graphql/ts/types';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {
  }

  public async createUser(userRegister: UserRegister): Promise<Auth> {
    const user = {
      ...userRegister,
      password: this.createPasswordHash(userRegister.password),
    };
    const entity = await this.userService.create(user);
    return {
      token: this.createTokenForUser(entity),
      user: entity,
    };
  }

  private createPasswordHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  public createTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      role: user.role,
      id: user.id,
    });
  }

  public async login(userNameOrEmail: string, password: string): Promise<Auth> {
    const user = await this.userService.findByUsernameOrEmail(userNameOrEmail);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    return {
      user,
      token: this.createTokenForUser(user),
    };
  }

  public async updateUser(id: string, user: UserUpdateInput): Promise<User> {
    const input = {
      ...user,
    };
    if (input.password) {
      input.password = this.createPasswordHash(input.password);
    }
    return await this.userService.update(id, input);
  }
}
