import { Media, MediaIdSource, URLSource } from '../graphql/ts/types';
import { testDateTime } from './datetime.tester';

export function testMedia(media: Media | any) {
  expect(media).toEqual(
    expect.objectContaining({
      source: expect.objectContaining({
        sourceType: expect.stringMatching(/YOUTUBE/),
        mediaType: expect.stringMatching(/(AUDIO|VIDEO|IMAGE)/),
      }),
    }),
  );
  expect(media.source.thumbnail).toBeOptionalString();
  expect(media.id).toBeOptionalString();
  if (media.createdAt) {
    testDateTime(media.createdAt);
  }
  if (media.updatedAt) {
    testDateTime(media.updatedAt);
  }
}

export function testMediaWithUrlSource(media: Media | any) {
  testMedia(media);
  expect((media.source as URLSource).url).toEqual(expect.any(String));
}

export function testMediaWithIdSource(media: Media | any) {
  testMedia(media);
  expect((media.source as MediaIdSource).id).toEqual(expect.any(String));
}
