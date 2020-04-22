import { INestApplication } from '@nestjs/common';
import { testUser } from '../src/test/user.tester';
import { Auth as IAuth } from '../src/graphql/ts/types';
import { graphQLInteraction, Interaction } from '../src/graphql/ts/interaction';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';
import * as _ from 'lodash';

describe('Auth integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
  });

  it('should contain valid structure', () => {
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('userRegister');
  });

  it('should register user', async () => {
    const generator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    expect(generator).toBeDefined();
    const userToRegister = generator.userRegister();
    const query: Interaction = graphQLInteraction.userRegister(userToRegister);
    const response = await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const { data } = response.body;
    expect(data).toHaveProperty('userRegister');
    expect(data.userRegister).toHaveProperty('token');
    expect(data.userRegister).toHaveProperty('user');
    testUser(data.userRegister.user);
  });

  it('should register and login user', async () => {
    const generator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    expect(generator).toBeDefined();
    const userToRegister = generator.userRegister();
    const query: Interaction = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{userLogin: IAuth}>(app, graphQLInteraction.userLogin(userToRegister.userName, userToRegister.password));
    expect(data.body.data.userLogin).toHaveProperty('token');
    expect(data.body.data.userLogin).toHaveProperty('user');
    testUser(data.body.data.userLogin.user);
  });

  it('should fail login due to non-existing user', async () => {
    const generator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    expect(generator).toBeDefined();
    const data = await makeGraphQLRequest<{userLogin: IAuth}>(app, graphQLInteraction.userLogin('user', 'pass'));
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  it('should fail login due to invalid credentials', async () => {
    const generator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    expect(generator).toBeDefined();
    const userToRegister = generator.userRegister();
    const query: Interaction = graphQLInteraction.userRegister(userToRegister);
    await makeGraphQLRequest<{ userRegister: IAuth }>(app, query);
    const data = await makeGraphQLRequest<{userLogin: IAuth}>(app, graphQLInteraction.userLogin(userToRegister.userName, ''));
    expect(data.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
