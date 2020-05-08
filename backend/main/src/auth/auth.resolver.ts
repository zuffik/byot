import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  IMutation,
  IQuery,
  ResetPassword,
  User as IUser,
  UserLogin,
  UserRegister,
  UserUpdateInput,
} from '../graphql/ts/types';
import { Auth } from './auth.entity';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtUser, JwtUserType } from './decorators/jwt-user.decorator';
import { BaseResolver } from '../helpers/BaseResolver';
import { AuthGuard } from './jwt/auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { TokenService } from '../user/token/token.service';
import { Token } from '../user/token/token.entity';

@Resolver('Auth')
export class AuthResolver extends BaseResolver
  implements Partial<IMutation & IQuery> {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(MailerService) private readonly mailerService: MailerService,
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {
    super();
  }

  @Mutation('userRegister')
  public async userRegister(@Args('user') user: UserRegister): Promise<Auth> {
    const result = await this.authService.createUser(user);
    result.user.tokens = Promise.resolve([result.confirmToken]);
    await this.mailerService.sendMail({
      to: result.user.email,
      template: 'user-confirm-email',
      // todo change subjects
      subject: 'Confirm Email',
      context: { token: result.confirmToken.token },
    });
    return result;
  }

  @Mutation('userLogin')
  public async userLogin(@Args('user') user: UserLogin): Promise<Auth> {
    const u = await this.authService.login(user.userNameOrEmail, user.password);
    if (!u) {
      throw new UnauthorizedException();
    }
    return u;
  }

  @Mutation('userUpdateMyself')
  @UseGuards(AuthGuard)
  public async userUpdateMyself(
    @Args('user') input: UserUpdateInput,
    @JwtUser() user?: JwtUserType,
  ): Promise<IUser> {
    if (input.password && input.password !== input.passwordRepeat) {
      throw new BadRequestException('Passwords must match');
    } else if (!input.password) {
      delete input.password;
    }
    delete input.passwordRepeat;
    return this.returnOrBail(await this.authService.updateUser(user.id, input));
  }

  @Mutation('userResetPassword')
  public async userResetPassword(
    @Args('input') input: ResetPassword,
  ): Promise<Token> {
    if (input.newPassword !== input.passwordRepeat) {
      throw new BadRequestException();
    }
    const token = await this.returnOrBail(
      await this.tokenService.resolve(input.token),
    );
    await this.authService.updateUser(token.user.id, {
      password: input.newPassword,
    });
    return token;
  }
}
