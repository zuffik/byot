import { INestApplication } from '@nestjs/common';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { Role, UserList } from '../src/graphql/ts/types';
import { graphQLInteraction, Interaction } from '../src/graphql/ts/interaction';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';
import { UserService } from '../src/user/user.service';
import * as _ from 'lodash';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';

describe('User integration', () => {
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

  it('should contain valid structure', async () => {
    expect(gqlGenerator).toBeDefined();
    expect(userService).toBeDefined();
    expect(queryRunner).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allUsers');
  });

  it('should fetch all users', async () => {
    await Promise.all(_.times(10, () => userService.create(gqlGenerator.userRegister())));
    const response = await makeGraphQLRequest(app, graphQLInteraction.allUsers(), Role.ADMIN);
    const { data } = response.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
