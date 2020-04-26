import { INestApplication } from '@nestjs/common';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { Role } from '../src/graphql/ts/types';
import { graphQLInteraction } from '../src/graphql/ts/interaction';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';
import { UserService } from '../src/user/user.service';
import * as _ from 'lodash';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { AuthService } from '../src/auth/auth.service';

describe('User integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let userService: UserService;
  let authService: AuthService;
  let gqlGenerator: GeneratorGraphqlService;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    userService = app.get<UserService>(UserService);
    authService = app.get<AuthService>(AuthService);
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should contain valid structure', async () => {
    expect(gqlGenerator).toBeDefined();
    expect(userService).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(authService).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allUsers');
    expect(graphQLInteraction).toHaveProperty('user');
    expect(graphQLInteraction).toHaveProperty('me');
  });

  it('should fetch all users', async () => {
    await Promise.all(_.times(10, () => userService.create(gqlGenerator.userRegister())));
    const response = await makeGraphQLRequest(app, graphQLInteraction.allUsers(), {userRole: Role.ADMIN});
    const { data } = response.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });

  it('should fetch user by its id', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(app, graphQLInteraction.user(auth.user.id), {token: auth.token});
    const { data } = response.body;
    expect(data.user).toEqual(expect.objectContaining(_.pick(auth.user, _.keys(data.user))));
  });

  it('should fetch user as admin', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(app, graphQLInteraction.user(auth.user.id), {userRole: Role.ADMIN});
    const { data } = response.body;
    expect(data.user).toEqual(expect.objectContaining(_.pick(auth.user, _.keys(data.user))));
  });

  it('should fail fetching user due to non-existing user', async () => {
    const response = await makeGraphQLRequest(app, graphQLInteraction.user('some-id'), {userRole: Role.ADMIN});
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should fail fetching other user', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(app, graphQLInteraction.user(auth.user.id), {userRole: Role.USER});
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should fetch me', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const response = await makeGraphQLRequest(app, graphQLInteraction.me(), {token: auth.token});
    const { data } = response.body;
    expect(data.me).toEqual(expect.objectContaining(_.pick(auth.user, _.keys(data.me))));
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
    const updateResponse = await makeGraphQLRequest(app, graphQLInteraction.userUpdate(auth.user.id, user), {token: auth.token});
    expect(updateResponse.body.errors).toBeUndefined();
    expect(updateResponse.body.data.userUpdate).toEqual(expect.objectContaining(_.pick(user, _.keys(updateResponse.body.data.userUpdate))));
    const fetchResponse = await makeGraphQLRequest(app, graphQLInteraction.user(auth.user.id), {token: auth.token});
    expect(fetchResponse.body.errors).toBeUndefined();
    expect(fetchResponse.body.data.user).toEqual(expect.objectContaining(_.pick(user, _.keys(fetchResponse.body.data.user))));
  });

  it('should not update user due to non-auth user', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const response = await makeGraphQLRequest(app, graphQLInteraction.userUpdate(auth.user.id, user));
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should not update user due to insufficient permissions', async () => {
    const auth = await authService.createUser(gqlGenerator.userRegister());
    const user = {
      firstName: 'First',
      lastName: 'Last',
    };
    const response = await makeGraphQLRequest(app, graphQLInteraction.userUpdate(auth.user.id, user), {userRole: Role.USER});
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
