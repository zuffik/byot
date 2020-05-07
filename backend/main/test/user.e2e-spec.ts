import { INestApplication } from '@nestjs/common';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import {
  Auth as IAuth,
  AuthName,
  AuthNameCheck,
  Role,
  TokenType,
} from '../src/graphql/ts/types';
import { graphQLInteraction } from './helpers/interaction';
import { QueryRunner, Repository } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { loginTestUser, makeGraphQLRequest } from './helpers/http.helper';
import { UserService } from '../src/user/user.service';
import * as _ from 'lodash';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { AuthService } from '../src/auth/auth.service';
import { Token } from '../src/user/token/token.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('User integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let userService: UserService;
  let authService: AuthService;
  let tokenRepository: Repository<Token>;
  let gqlGenerator: GeneratorGraphqlService;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    userService = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
    tokenRepository = app.get<Repository<Token>>(getRepositoryToken(Token));
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should contain valid structure', async () => {
    expect(gqlGenerator).toBeDefined();
    expect(userService).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(authService).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allUsers');
    expect(graphQLInteraction).toHaveProperty('user');
    expect(graphQLInteraction).toHaveProperty('me');
    expect(graphQLInteraction).toHaveProperty('userConfirmEmail');
    expect(graphQLInteraction).toHaveProperty('checkUserAuthName');
  });

  it('should fetch all users', async () => {
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

  it('should fetch user by its id', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.user(auth.user.id),
      { token: auth.token },
    );
    const { data } = response.body;
    expect(data.user).toEqual(
      expect.objectContaining(_.pick(auth.user, _.keys(data.user))),
    );
  });

  it('should fetch user as admin', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.user(auth.user.id),
      { userRole: Role.ADMIN },
    );
    const { data } = response.body;
    expect(data.user).toEqual(
      expect.objectContaining(_.pick(auth.user, _.keys(data.user))),
    );
  });

  it('should fail fetching user due to non-existing user', async () => {
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.user('some-id'),
      { userRole: Role.ADMIN },
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should fail fetching other user', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.user(auth.user.id),
      { userRole: Role.USER },
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should fetch me', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(app, graphQLInteraction.me(), {
      token: auth.token,
    });
    const { data } = response.body;
    expect(data.me).toEqual(
      expect.objectContaining(_.pick(auth.user, _.keys(data.me))),
    );
  });

  it('should fail fetching me due to missing token', async () => {
    const response = await makeGraphQLRequest(app, graphQLInteraction.me());
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should update user not validated fields by its id', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const updateResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdate(auth.user.id, user),
      { token: auth.token },
    );
    expect(updateResponse.body.errors).toBeUndefined();
    expect(updateResponse.body.data.userUpdate).toEqual(
      expect.objectContaining(
        _.pick(user, _.keys(updateResponse.body.data.userUpdate)),
      ),
    );
    const fetchResponse = await makeGraphQLRequest(
      app,
      graphQLInteraction.user(auth.user.id),
      { token: auth.token },
    );
    expect(fetchResponse.body.errors).toBeUndefined();
    expect(fetchResponse.body.data.user).toEqual(
      expect.objectContaining(
        _.pick(user, _.keys(fetchResponse.body.data.user)),
      ),
    );
  });

  it('should not update user due to non-auth user', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdate(auth.user.id, user),
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should not update user due to insufficient permissions', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.userUpdate(auth.user.id, user),
      { userRole: Role.USER },
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should confirm registration token', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const data = await makeGraphQLRequest<{ userRegister: IAuth }>(
      app,
      graphQLInteraction.userRegister(userToRegister),
    );
    const token = await tokenRepository.findOne({
      where: {
        user: { id: data.body.data.userRegister.user.id },
        valid: true,
        tokenType: TokenType.EMAIL_CONFIRMATION,
      },
    });
    expect(token).toBeDefined();
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.userConfirmEmail(token.token),
    );
    expect(response.body.errors).toBeUndefined();
    const tokenAfter = await tokenRepository.findOne({
      where: {
        user: { id: data.body.data.userRegister.user.id },
        valid: true,
        tokenType: TokenType.EMAIL_CONFIRMATION,
      },
    });
    expect(tokenAfter).toBeUndefined();
  });

  it('should fail confirming registration token', async () => {
    const response = await makeGraphQLRequest(
      app,
      graphQLInteraction.userConfirmEmail('undefined-id'),
    );
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should check for available email', async () => {
    const input: AuthNameCheck = {
      type: AuthName.EMAIL,
      name: 'any-email',
    };
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.checkUserAuthName(input),
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.checkUserAuthName).toEqual({
      available: true,
    });
  });

  it('should check for non available email', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const input: AuthNameCheck = {
      type: AuthName.EMAIL,
      name: auth.user.email,
    };
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.checkUserAuthName(input),
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.checkUserAuthName).toEqual({
      available: false,
    });
  });

  it('should check for available userName', async () => {
    const input: AuthNameCheck = {
      type: AuthName.USER_NAME,
      name: 'totally-non-existing-username-slkdfjalsdjfsa',
    };
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.checkUserAuthName(input),
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.checkUserAuthName).toEqual({
      available: true,
    });
  });

  it('should check for non available userName', async () => {
    const auth = await loginTestUser(app, Role.USER);
    const input: AuthNameCheck = {
      type: AuthName.USER_NAME,
      name: auth.user.userName,
    };
    const result = await makeGraphQLRequest(
      app,
      graphQLInteraction.checkUserAuthName(input),
    );
    expect(result.body.errors).toBeUndefined();
    expect(result.body.data.checkUserAuthName).toEqual({
      available: false,
    });
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
