import { Media, Source } from '../graphql/ts/types';
import { testDateTime } from './datetime.tester';

export async function testMedia(media: Media | any) {
  testSource(
    media.source instanceof Promise ? await media.source : media.source,
  );
  expect(media.id).toBeOptionalString();
  if (media.createdAt) {
    testDateTime(media.createdAt);
  }
  if (media.updatedAt) {
    testDateTime(media.updatedAt);
  }
}

export function testSource(source: Source | any) {
  expect(source).toEqual(
    expect.objectContaining({
      sourceType: expect.stringMatching(/YOUTUBE/),
      mediaType: expect.stringMatching(/(AUDIO|VIDEO|IMAGE)/),
    }),
  );
  expect(source.thumbnail).toBeOptionalString();
  expect(source.mediaId).toBeOptionalString();
  expect(source.id).toBeOptionalString();
  expect(source.url).toBeOptionalString();
}
