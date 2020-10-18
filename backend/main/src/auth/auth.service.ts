import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenType, UserRegister, UserUpdateInput } from '../graphql/ts/types';
import * as bcryptjs from 'bcryptjs';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';
import { TokenService } from '../user/token/token.service';
import { Token } from '../user/token/token.entity';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  public async createUser(
    userRegister: UserRegister,
  ): Promise<Auth & { confirmToken: Token }> {
    const usernameParts = [
      userRegister.firstName,
      userRegister.lastName,
    ].filter(Boolean);
    if (usernameParts.length === 0) {
      usernameParts.push('user');
    }
    const user: UserRegister = {
      ...userRegister,
      userName:
        userRegister.userName ||
        slugify(usernameParts.join(' ') + ' ' + uuid().slice(0, 8), {
          lower: true,
        }),
      password: this.createPasswordHash(userRegister.password),
    };
    const entity = await this.userService.create(user);
    const token = await this.tokenService.create(
      entity,
      TokenType.EMAIL_CONFIRMATION,
    );
    return {
      token: this.createTokenForUser(entity),
      user: entity,
      confirmToken: token,
    };
  }

  public createPasswordHash(password: string) {
    return bcryptjs.hashSync(password, 10);
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
    if (!user || !bcryptjs.compareSync(password, user.password)) {
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
