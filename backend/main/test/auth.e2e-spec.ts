import { INestApplication } from '@nestjs/common';
import { testUser } from '../src/test/user.tester';
import {
  Auth as IAuth,
  ResetPassword,
  Role,
  TokenType,
  UserUpdateInput,
} from '../src/graphql/ts/types';
import { graphQLInteraction } from './helpers/interaction';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { QueryRunner, Repository } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { loginTestUser, makeGraphQLRequest } from './helpers/http.helper';
import * as _ from 'lodash';
import { testList } from '../src/test/list.tester';
import { UserService } from '../src/user/user.service';
import * as moment from 'moment';
import { Token } from '../src/user/token/token.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { envVars } from './helpers/env.helper';

describe('Auth integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let userService: UserService;
  let gqlGenerator: GeneratorGraphqlService;
  let tokenRepository: Repository<Token>;
  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    userService = app.get<UserService>(UserService);
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    tokenRepository = app.get<Repository<Token>>(getRepositoryToken(Token));
  });

  it('should contain valid structure', () => {
    expect(gqlGenerator).toBeDefined();
    expect(userService).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('userRegister');
    expect(graphQLInteraction).toHaveProperty('userLogin');
    expect(graphQLInteraction).toHaveProperty('userRequestPasswordReset');
  });

  it('should register user', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    const response = await makeGraphQLRequest<{ userRegister: IAuth }>(
      app,
      query,
    );
    const { data } = response.body;
    expect(response.body.errors).toBeUndefined();
    expect(data).toHaveProperty('userRegister');
    expect(data.userRegister).toHaveProperty('token');
    expect(data.userRegister).toHaveProperty('user');
    await testUser(data.userRegister.user);
    expect(data.userRegister.user.emailValidated).toBeFalsy();
  });

  it('should register and login user', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(
      app,
      graphQLInteraction.userLogin(
        userToRegister.userName,
        userToRegister.password,
      ),
    );
    expect(data.body.data.userLogin).toHaveProperty('token');
    expect(data.body.data.userLogin).toHaveProperty('user');
    await testUser(data.body.data.userLogin.user);
    expect(data.body.data.userLogin.user.emailValidated).toBeFalsy();
  });

  it('should fail login due to non-existing user', async () => {
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(
      app,
      graphQLInteraction.userLogin('user', 'pass'),
    );
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  it('should fail login due to invalid credentials', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(
      app,
      graphQLInteraction.userLogin(userToRegister.userName, ''),
    );
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  it('should call role protected method and pass', async () => {
    await Promise.all(
      _.times(10, () => userService.create(gqlGenerator.userRegister())),
    );
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.allUsers(),
      { userRole: Role.ADMIN },
    );
    const { data } = response.body;
    testList(data.allUsers);
    await Promise.all(data.allUsers.entries.map(testUser));
  });

  it('should call auth protected method and fail', async () => {
    await Promise.all(
      _.times(10, () => userService.create(gqlGenerator.userRegister())),
    );
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.allUsers(),
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should call role protected method and fail', async () => {
    await Promise.all(
      _.times(10, () => userService.create(gqlGenerator.userRegister())),
    );
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.allUsers(),
      { userRole: Role.USER },
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should inject current user', async () => {
    const response = await makeGraphQLRequest(app, graphQLInteraction.me(), {
      userRole: Role.ADMIN,
    });
    expect(response.body.errors).toBeUndefined();
  });

  it('should update my name', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(
      app,
      graphQLInteraction.userRegister(userToRegister),
    );
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      firstName: 'first',
      lastName: 'last',
    };
    const updateResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdateMyself(update),
      { token: auth.token },
    );
    expect(updateResponse.body.errors).toBeUndefined();
    expect(updateResponse.body.data.userUpdateMyself).toEqual(
      expect.objectContaining(
        _.pick(update, _.keys(updateResponse.body.data.userUpdateMyself)),
      ),
    );
  });

  it('should update my password', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(
      app,
      graphQLInteraction.userRegister(userToRegister),
    );
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      password: 'newPass',
      passwordRepeat: 'newPass',
    };
    const updateResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdateMyself(update),
      { token: auth.token },
    );
    expect(updateResponse.body.errors).toBeUndefined();
    const loginResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userLogin(userToRegister.email, update.password),
    );
    expect(loginResponse.body.errors).toBeUndefined();
  });

  it('should not update my password due to mismatched passwords', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(
      app,
      graphQLInteraction.userRegister(userToRegister),
    );
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      password: 'newPass',
      passwordRepeat: 'notNewPass',
    };
    const updateResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdateMyself(update),
      { token: auth.token },
    );
    expect(updateResponse.body.errors).toEqual(expect.any(Array));
    const loginResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userLogin(userToRegister.email, update.password),
    );
    expect(loginResponse.body.errors).toEqual(expect.any(Array));
  });

  it('should not update myself due to non-logged user', async () => {
    const update: UserUpdateInput = {
      firstName: 'first',
      lastName: 'last',
    };
    const updateResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdateMyself(update),
    );
    expect(updateResponse.body.errors).toEqual(expect.any(Array));
  });

  it('should reset password', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const resultRequest = await makeGraphQLRequest(
      app,
      graphQLInteraction.userRequestPasswordReset(auth.user.email),
    );
    expect(resultRequest.body.errors).toBeUndefined();
    const token = await tokenRepository.findOne({
      where: {
        user: { id: auth.user.id },
        tokenType: TokenType.PASSWORD_RESET,
      },
    });
    expect(token).toBeDefined();
    expect(+moment(token.validUntil.iso)).toBeGreaterThan(+moment());
    const newPass = 'newPass';
    const input: ResetPassword = {
      newPassword: newPass,
      passwordRepeat: newPass,
      token: token.token,
    };
    const resultReset = await makeGraphQLRequest(
      app,
      graphQLInteraction.userResetPassword(input),
    );
    expect(resultReset.body.errors).toBeUndefined();
    const resultLogin = await makeGraphQLRequest(
      app,
      graphQLInteraction.userLogin(auth.user.userName, newPass),
    );
    expect(resultLogin.body.errors).toBeUndefined();
    await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdateMyself({
        password: envVars.APP_DEMO_USER_PASS,
        passwordRepeat: envVars.APP_DEMO_USER_PASS,
      }),
      { token: auth.token },
    );
  });

  it('should not reset password due to invalid token', async () => {
    const newPass = 'newPass';
    const input: ResetPassword = {
      newPassword: newPass,
      passwordRepeat: newPass,
      token: 'invalid-token',
    };
    const resultReset = await makeGraphQLRequest(
      app,
      graphQLInteraction.userResetPassword(input),
    );
    expect(resultReset.body.errors).toEqual(expect.any(Array));
  });

  it('should not reset password due to non-matching passwords', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const resultRequest = await makeGraphQLRequest(
      app,
      graphQLInteraction.userRequestPasswordReset(auth.user.email),
    );
    expect(resultRequest.body.errors).toBeUndefined();
    const token = await tokenRepository.findOne({
      where: {
        user: { id: auth.user.id },
        tokenType: TokenType.PASSWORD_RESET,
      },
    });
    expect(token).toBeDefined();
    expect(+moment(token.validUntil.iso)).toBeGreaterThan(+moment());
    const newPass = 'newPass';
    const input: ResetPassword = {
      newPassword: newPass,
      passwordRepeat: newPass + '-wrong-pass',
      token: token.token,
    };
    const resultReset = await makeGraphQLRequest(
      app,
      graphQLInteraction.userResetPassword(input),
    );
    expect(resultReset.body.errors).toEqual(expect.any(Array));
    const resultLogin = await makeGraphQLRequest(
      app,
      graphQLInteraction.userLogin(auth.user.userName, newPass),
    );
    expect(resultLogin.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
