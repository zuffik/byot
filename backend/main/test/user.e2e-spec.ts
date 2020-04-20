import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { testList } from '../src/test/list.tester';
import { testUser } from '../src/test/user.tester';
import { UserList } from '../src/graphql/ts/types';
import { graphQLInteraction } from '../../../common/graphql/ts/interaction';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should fetch all users', async () => {
    const query = graphQLInteraction;
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });
    const { data }: { data: { allUsers: UserList } } = res.body;
    testList(data.allUsers);
    data.allUsers.entries.forEach(testUser);
  });
  afterEach(() => app.close());
});
