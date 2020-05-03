import { createApp, destroyApp } from '../helpers/module.helper';
import { INestApplication } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { YoutubeProvider } from '../../src/media/providers/youtube.provider';
import { testMedia } from '../../src/test/media.tester';

describe('YouTube provider', () => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  let provider: YoutubeProvider;

  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
    provider = app.get<YoutubeProvider>(YoutubeProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should search for data', async () => {
    const query = 'google';
    const [items, count] = await provider.findAll({ query });
    expect(items).toEqual(expect.any(Array));
    items.forEach(testMedia);
    expect(count).toEqual(expect.any(Number));
  });

  it('should parse full url to video', async () => {
    const url = 'https://www.youtube.com/watch?v=w3m4N0UVt0M';
    const videoId = 'w3m4N0UVt0M';
    const media = await provider.parseFromUrl(url);
    testMedia(media);
    expect(media.source.resourceId).toEqual(videoId);
  });

  it('should parse short url to video', async () => {
    const url = 'https://youtu.be/w3m4N0UVt0M';
    const videoId = 'w3m4N0UVt0M';
    const media = await provider.parseFromUrl(url);
    testMedia(media);
    expect(media.source.resourceId).toEqual(videoId);
  });

  it('should find video by ID', async () => {
    const videoId = 'w3m4N0UVt0M';
    const media = await provider.findById(videoId);
    testMedia(media);
    expect(media.source.resourceId).toEqual(videoId);
  });

  it('should fail finding video', async () => {
    const url = 'https://youtu.be/some-totally-bullshit-id';
    const media = await provider.parseFromUrl(url);
    expect(media).toBeUndefined();
  });

  afterEach(() => destroyApp({ app, queryRunner }));
});
