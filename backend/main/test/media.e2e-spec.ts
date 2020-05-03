import { INestApplication } from '@nestjs/common';
import { graphQLInteraction } from '../src/graphql/ts/interaction';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { testList } from '../src/test/list.tester';
import { makeGraphQLRequest } from './helpers/http.helper';
import { testMedia } from '../src/test/media.tester';
import { Role } from '../src/graphql/ts/types';

describe('Remote media integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
  });

  it('should contain valid structure', async () => {
    expect(queryRunner).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('findMedia');
  });

  it('should look for medias', async () => {
    const query = 'google';
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.findMedia({
        query,
      }),
      { userRole: Role.USER },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testList(mediaList.body.data.findMedia, testMedia);
  });

  it('should look for local medias as admin', async () => {
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.findMedia({
        local: true,
        query: 'workout',
        pagination: { limit: 5 },
      }),
      { userRole: Role.ADMIN },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testList(mediaList.body.data.findMedia, testMedia);
  });

  it('should look for local medias as user', async () => {
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.findMedia({
        local: true,
        query: 'workout',
        pagination: { limit: 5 },
      }),
      { userRole: Role.USER },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testList(mediaList.body.data.findMedia, testMedia);
  });

  it('should parse url', async () => {
    const query = 'https://www.youtube.com/watch?v=QOXup8chEoY';
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.findMedia({
        query,
      }),
      { userRole: Role.USER },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testList(mediaList.body.data.findMedia, testMedia);
    expect(mediaList.body.data.findMedia.meta.totalCount).toEqual(1);
    expect(mediaList.body.data.findMedia.entries.length).toEqual(1);
  });

  it('should fail searching with unauthorized user', async () => {
    const query = 'google';
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.findMedia({
        query,
      }),
    );
    expect(mediaList.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
