import { INestApplication } from '@nestjs/common';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { UserList } from '../src/graphql/ts/types';
import { graphQLInteraction, Interaction } from '../src/graphql/ts/interaction';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { makeGraphQLRequest } from './helpers/http.helper';

describe('User integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
  });

  it('should contain valid structure', () => {
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allUsers');
  });

  it('should fetch all users', async () => {
    const query: Interaction = graphQLInteraction.allUsers();
    const response = await makeGraphQLRequest<{ allUsers: UserList }>(app, query);
    const { data } = response.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
