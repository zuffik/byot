import { INestApplication } from '@nestjs/common';
import { testUser } from '../src/test/user.tester';
import { Auth as IAuth, Role, UserUpdateInput } from '../src/graphql/ts/types';
import { graphQLInteraction } from '../src/graphql/ts/interaction';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';
import * as _ from 'lodash';
import { testList } from '../src/test/list.tester';
import { UserService } from '../src/user/user.service';

describe('Auth integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let userService: UserService;
  let gqlGenerator: GeneratorGraphqlService;
  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    userService = app.get<UserService>(UserService);
    gqlGenerator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should contain valid structure', () => {
    expect(gqlGenerator).toBeDefined();
    expect(userService).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('userRegister');
  });

  it('should register user', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    const response = await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const { data } = response.body;
    expect(response.body.errors).toBeUndefined();
    expect(data).toHaveProperty('userRegister');
    expect(data.userRegister).toHaveProperty('token');
    expect(data.userRegister).toHaveProperty('user');
    testUser(data.userRegister.user);
  });

  it('should register and login user', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(app, graphQLInteraction.userLogin(userToRegister.userName, userToRegister.password));
    expect(data.body.data.userLogin).toHaveProperty('token');
    expect(data.body.data.userLogin).toHaveProperty('user');
    testUser(data.body.data.userLogin.user);
  });

  it('should fail login due to non-existing user', async () => {
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(app, graphQLInteraction.userLogin('user', 'pass'));
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  it('should fail login due to invalid credentials', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const query = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{ userLogin: IAuth }>(app, graphQLInteraction.userLogin(userToRegister.userName, ''));
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  it('should call role protected method and pass', async () => {
    await Promise.all(_.times(10, () => userService.create(gqlGenerator.userRegister())));
    const response = await makeGraphQLRequest(app, graphQLInteraction.allUsers(), { userRole: Role.ADMIN });
    const { data } = response.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });

  it('should call auth protected method and fail', async () => {
    await Promise.all(_.times(10, () => userService.create(gqlGenerator.userRegister())));
    const response = await makeGraphQLRequest(app, graphQLInteraction.allUsers());
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should call role protected method and fail', async () => {
    await Promise.all(_.times(10, () => userService.create(gqlGenerator.userRegister())));
    const response = await makeGraphQLRequest(app, graphQLInteraction.allUsers(), { userRole: Role.USER });
    expect(response.body.errors).toEqual(expect.any(Array));
  });

  it('should inject current user', async () => {
    const response = await makeGraphQLRequest(app, graphQLInteraction.me(), { userRole: Role.ADMIN });
    expect(response.body.errors).toBeUndefined();
  });

  it('should update my name', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(app, graphQLInteraction.userRegister(userToRegister));
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      firstName: 'first',
      lastName: 'last',
    };
    const updateResponse = await makeGraphQLRequest(app, graphQLInteraction.userUpdateMyself(update), { token: auth.token });
    expect(updateResponse.body.errors).toBeUndefined();
    expect(updateResponse.body.data.userUpdateMyself)
      .toEqual(expect.objectContaining(_.pick(update, _.keys(updateResponse.body.data.userUpdateMyself))));
  });

  it('should update my password', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(app, graphQLInteraction.userRegister(userToRegister));
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      password: 'newPass',
      passwordRepeat: 'newPass',
    };
    const updateResponse = await makeGraphQLRequest(app, graphQLInteraction.userUpdateMyself(update), { token: auth.token });
    expect(updateResponse.body.errors).toBeUndefined();
    const loginResponse = await makeGraphQLRequest(app, graphQLInteraction.userLogin(userToRegister.email, update.password));
    expect(loginResponse.body.errors).toBeUndefined();
  });

  it('should not update my password due to mismatched passwords', async () => {
    const userToRegister = gqlGenerator.userRegister();
    const registerResponse = await makeGraphQLRequest<{ userRegister: IAuth }>(app, graphQLInteraction.userRegister(userToRegister));
    expect(registerResponse.body.errors).toBeUndefined();
    const auth = registerResponse.body.data.userRegister;
    const update: UserUpdateInput = {
      password: 'newPass',
      passwordRepeat: 'notNewPass',
    };
    const updateResponse = await makeGraphQLRequest(app, graphQLInteraction.userUpdateMyself(update), { token: auth.token });
    expect(updateResponse.body.errors).toEqual(expect.any(Array));
    const loginResponse = await makeGraphQLRequest(app, graphQLInteraction.userLogin(userToRegister.email, update.password));
    expect(loginResponse.body.errors).toEqual(expect.any(Array));
  });

  it('should update myself due to non-logged user', async () => {
    const update: UserUpdateInput = {
      firstName: 'first',
      lastName: 'last',
    };
    const updateResponse = await makeGraphQLRequest(app, graphQLInteraction.userUpdateMyself(update));
    expect(updateResponse.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
