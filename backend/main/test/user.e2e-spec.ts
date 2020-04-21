import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { Auth as IAuth, User as IUser, UserList } from '../src/graphql/ts/types';
import { graphQLInteraction, Interaction } from '../src/graphql/ts/interaction';
import { makeGraphQLRequest } from './graphql.helper';
import { GeneratorGraphqlService } from '../src/seed/generator-graphql/generator-graphql.service';

describe('User integration', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should contain valid structure', () => {
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('allUsers');
    expect(graphQLInteraction).toHaveProperty('userRegister');
  });

  it('should register user', async () => {
    const generator = app.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    expect(generator).toBeDefined();
    const userToRegister = generator.userRegister();
    const query: Interaction = graphQLInteraction.userRegister(userToRegister);
    const response = await makeGraphQLRequest<{userRegister: IAuth}>(app, query);
    const {data} = response.body;
    expect(data).toHaveProperty('userRegister');
    expect(data.userRegister).toHaveProperty('token');
    expect(data.userRegister).toHaveProperty('user');
    testUser(data.userRegister.user);
  });

  it('should fetch all users', async () => {
    const query: Interaction = graphQLInteraction.allUsers();
    const response = await makeGraphQLRequest<{allUsers: UserList}>(app, query);
    const {data} = response.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });

  afterEach(() => app.close());
});
