import { INestApplication } from '@nestjs/common';
import { graphQLInteraction } from './helpers/interaction';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from './helpers/module.helper';
import { testList } from '../src/test/list.tester';
import { makeGraphQLRequest } from './helpers/http.helper';
import { testMedia } from '../src/test/media.tester';
import { Role } from '../src/graphql/ts/types';
import { MediaService } from '../src/media/media/media.service';

describe('Remote media integration', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let mediaService: MediaService;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    mediaService = app.get<MediaService>(MediaService);
  });

  it('should contain valid structure', async () => {
    expect(queryRunner).toBeDefined();
    expect(mediaService).toBeDefined();
    expect(graphQLInteraction).toBeDefined();
    expect(graphQLInteraction).toHaveProperty('findMedia');
    expect(graphQLInteraction).toHaveProperty('allMedia');
    expect(graphQLInteraction).toHaveProperty('media');
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

  it('should fetch all medias as admin', async () => {
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.allMedia(),
      { userRole: Role.ADMIN },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testList(mediaList.body.data.allMedia, testMedia);
  });

  it('should fail fetch all medias as user', async () => {
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.allMedia(),
      { userRole: Role.USER },
    );
    expect(mediaList.body.errors).toEqual(expect.any(Array));
  });

  it('should fetch media by id as admin', async () => {
    const [[media]] = await mediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.media(media.id),
      { userRole: Role.ADMIN },
    );
    expect(mediaList.body.errors).toBeUndefined();
    testMedia(mediaList.body.data.media);
  });

  it('should not fetch non-existing media by id as admin', async () => {
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.media('not-existing-id'),
      { userRole: Role.ADMIN },
    );
    expect(mediaList.body.errors).toEqual(expect.any(Array));
  });

  it('should not fetch media by id as user', async () => {
    const [[media]] = await mediaService.findAndCount({
      pagination: { limit: 1 },
    });
    const mediaList = await makeGraphQLRequest(
      app,
      graphQLInteraction.media(media.id),
      { userRole: Role.USER },
    );
    expect(mediaList.body.errors).toEqual(expect.any(Array));
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
