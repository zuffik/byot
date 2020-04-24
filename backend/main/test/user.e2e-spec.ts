import { INestApplication } from '@nestjs/common';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { Role } from '../src/graphql/ts/types';
import { graphQLInteraction } from '../src/graphql/ts/interaction';
import { QueryRunner, Repository } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';
import { UserService } from '../src/user/user.service';
import * as _ from 'lodash';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { AuthService } from '../src/auth/auth.service';
import { User } from '../src/user/user.entity';

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

  afterEach(() => destroyApp({ app, queryRunner }));
});
