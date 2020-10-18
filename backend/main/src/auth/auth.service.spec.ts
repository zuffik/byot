import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { proxyMock } from '../test/proxy.mock';
import { SeedModule } from '../seed/seed.module';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { GeneratorOrmService } from '../seed/generator-orm/generator-orm.service';
import * as bcryptjs from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../user/token/token.service';
import { TokenType } from '../graphql/ts/types';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let tokenService: TokenService;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: proxyMock({
            create: jest.fn(async (user) => _.clone(user)),
          }),
        },
        {
          provide: JwtService,
          useValue: proxyMock({
            sign: jest.fn(() => ''),
          }),
        },
        {
          provide: TokenService,
          useValue: proxyMock(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    tokenService = module.get<TokenService>(TokenService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(tokenService).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
  });

  it('should create user with hashed password', async () => {
    const userRegister = gqlGenerator.userRegister();
    const spyCreateUser = jest.spyOn(userService, 'create');
    const token = ormGenerator.token();
    const spyCreateToken = jest
      .spyOn(tokenService, 'create')
      .mockImplementation(async () => token);
    const user = await authService.createUser(userRegister);
    expect(spyCreateUser).toBeCalledWith(
      expect.objectContaining({
        ..._.omit(userRegister, 'password'),
      }),
    );
    expect(user.user.password).not.toEqual(userRegister.password);
    expect(user.confirmToken).toEqual(token);
    expect(spyCreateToken).toBeCalledWith(
      user.user,
      TokenType.EMAIL_CONFIRMATION,
    );
  });

  it('should create user and create username', async () => {
    const userRegister = gqlGenerator.userRegister();
    userRegister.firstName = 'First';
    userRegister.lastName = 'Last';
    delete userRegister.userName;
    const spyCreateUser = jest.spyOn(userService, 'create');
    const token = ormGenerator.token();
    const spyCreateToken = jest
      .spyOn(tokenService, 'create')
      .mockImplementation(async () => token);
    const user = await authService.createUser(userRegister);
    expect(spyCreateUser).toBeCalledWith(
      expect.objectContaining({
        ..._.omit(userRegister, 'password'),
        userName: expect.stringMatching(/^first-last-/),
      }),
    );
    expect(user.user.password).not.toEqual(userRegister.password);
    expect(user.confirmToken).toEqual(token);
    expect(spyCreateToken).toBeCalledWith(
      user.user,
      TokenType.EMAIL_CONFIRMATION,
    );
  });

  it('should create token for user', async () => {
    const user = ormGenerator.user();
    const spy = jest.spyOn(jwtService, 'sign');
    const token = authService.createTokenForUser(user);
    expect(spy).toBeCalledWith({
      email: user.email,
      role: expect.any(String),
      id: user.id,
    });
    expect(token).toEqual(expect.any(String));
  });

  it('should login with valid credentials', async () => {
    const userNameOrEmail = 'user';
    const password = 'pass';
    const spyFind = jest
      .spyOn(userService, 'findByUsernameOrEmail')
      .mockImplementation(async () => {
        const user = ormGenerator.user();
        user.userName = userNameOrEmail;
        user.email = userNameOrEmail;
        user.password = bcryptjs.hashSync(password, 10);
        return user;
      });
    const spySign = jest.spyOn(jwtService, 'sign');

    await authService.login(userNameOrEmail, password);

    expect(spySign).toBeCalledWith({
      email: userNameOrEmail,
      role: expect.any(String),
      id: expect.any(String),
    });
    expect(spyFind).toBeCalledWith(userNameOrEmail);
  });

  it('should fail login with invalid username or email', async () => {
    const userNameOrEmail = 'user';
    const password = 'pass';
    const spyFind = jest
      .spyOn(userService, 'findByUsernameOrEmail')
      .mockImplementation(async () => undefined);
    await expect(
      authService.login(userNameOrEmail, password),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(spyFind).toBeCalledWith(userNameOrEmail);
  });

  it('should fail login with invalid password', async () => {
    const userNameOrEmail = 'user';
    const password = 'pass';
    const spyFind = jest
      .spyOn(userService, 'findByUsernameOrEmail')
      .mockImplementation(async () => {
        const user = ormGenerator.user();
        user.userName = userNameOrEmail;
        user.email = userNameOrEmail;
        return user;
      });
    await expect(
      authService.login(userNameOrEmail, password),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(spyFind).toBeCalledWith(userNameOrEmail);
  });

  it('should update current user', async () => {
    const id = 'id';
    const userUpdateInput = gqlGenerator.userUpdate(true);
    const spy = jest.spyOn(userService, 'update');
    await authService.updateUser(id, userUpdateInput);
    expect(spy).toBeCalledWith(id, {
      ...userUpdateInput,
      password: expect.any(String),
    });
  });
});
